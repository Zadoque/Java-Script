function BankAccount(){
    let bank_balance = 0;
    return {
        increase: function(value)  {
            bank_balance += value;
        },
        decrease: function(value){
            if(bank_balance >= value){
                bank_balance -= value;
            }
            else{
                console.log("you don't have enough money :(");
            }
        },
        get_balance: function(){
            return bank_balance;
        }
    }
}
console.log(BankAccount().get_balance());
let myAccount = BankAccount();
myAccount.increase(1400);
console.log(myAccount.get_balance());
