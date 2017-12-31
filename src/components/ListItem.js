import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { addMoney } from '../actions';

const monthToStr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class ListItem extends Component {

  componentWillMount() {
    const { transactions, fromDate, toDate } = this.props;
    const { date } = transactions;
    let expense = 0, income = 0;
    if(date >= fromDate && date <= toDate) {
      _.map(transactions, (trans, uid) => {
        if(uid !== "date") {
          if(trans.type === "Expense")
            expense += trans.amount;
          else
            income += trans.amount;
        }
      });
      this.props.addMoney({prop : 'expense', value : expense});  
      this.props.addMoney({prop : 'income', value : income});
    }
  }

  renderType(type, category, notes) {
    if(notes) {
      if(type === "Expense") {
        return (
          <Text>
            <Text style = {styles.expenseCategory}>{category}</Text> - {notes}
          </Text>
        );
      } else {
        return (
          <Text>
            <Text style = {styles.incomeCategory}>{type}</Text> - {notes}
          </Text>
        );
      }
    } else {
      if(type === "Expense") {
        return (
          <Text style = {styles.expenseCategory}>
            {category}
          </Text>
        );
      } else {
        return (
          <Text style = {styles.incomeCategory}>
            {type}
          </Text>
        );
      }
    }
  }

  renderAmount(type, amount) {
    if(type === "Expense") {
      return (
        <Text style = {styles.expenseAmount}>
          {amount}
        </Text>
      );
    } else {
      return (
        <Text style = {styles.incomeAmount}>
          {amount}
        </Text>
      );
    }
  }

  render() {
    const { date } = this.props.transactions;
    const dateParts = date.trim().split("-");
    const { fromDate, toDate } = this.props;
    console.disableYellowBox = true;
    if(date >= fromDate && date <= toDate) {
      return _.map(this.props.transactions, (trans, uid) => {
        if(uid === "date")
          return false;
        return (
          <TouchableOpacity style = {styles.transactionsContainer}>
            <View style = {styles.left}>
              <Text style = {styles.dateText}>
                {monthToStr[dateParts[1]-1]} {dateParts[2]},{dateParts[0]}
              </Text> 
            {this.renderType(trans.type, trans.category, trans.notes)}
            </View>
            <View style = {styles.amountContainer}>
              {this.renderAmount(trans.type, trans.amount)}
            </View>  
          </TouchableOpacity>
        );
      });
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  transactionsContainer :{
    flex : 1,
    flexDirection : 'row',
    margin : 5,
    backgroundColor: '#F8F8F8',
  },
  left : {
    paddingLeft : 8
  },
  dateText : {
    fontWeight : 'bold',
    fontSize : 15
  },
  amountContainer : {
    flex : 1,
    justifyContent : 'flex-end',
    alignItems : 'flex-end',
    paddingRight : 8
  },
  expenseAmount : {
    fontWeight : 'bold',
    fontSize : 15,
    color : '#F03434'
  },
  incomeAmount : {
    fontWeight : 'bold',
    fontSize : 15,
    color : '#1E824C'
  },
  expenseCategory : {
    color : '#F03434'
  },
  incomeCategory : {
    color : '#1E824C'
  }
});

const mapStateToProps = state => {
  let { fromDate, toDate, income, expense, balance } = state.transactions;
  
  let day = new Date(fromDate).getDate();
  day = day<10?0+""+day:day;
  let mon = new Date(fromDate).getMonth()+1;
  mon = mon<10?0+""+mon:mon;
  fromDate = new Date(fromDate).getFullYear()+"-"+mon+"-"+day;
  day = new Date(toDate).getDate();
  day = day<10?0+""+day:day;
  mon = new Date(toDate).getMonth()+1;
  mon = mon<10?0+""+mon:mon;
  toDate = new Date(toDate).getFullYear()+"-"+mon+"-"+day;

  return { fromDate, toDate, income, balance };
}

export default connect (mapStateToProps, { addMoney })(ListItem);
