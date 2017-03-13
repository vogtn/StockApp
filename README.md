# StockApp
webapp that communicates with Golang stock bot on slack to create stock portfolio. 

####Go bot repo:  https://github.com/vogtn/mybot
####Portfolio location: https://gostock.herokuapp.com

##How it works:
Pretend you have a slack channel filled with some of your friends. When you install GoStock bot on your channel, it listens for specific requests and returns a response.

* @gostock hi 

returns basic info about bot

* @gostock quote (stock)

returns a ($)quote from yahoo finance api based on the the stock symbol.

* @gostock buy (stock)

finds current price of stock same as above, however also posts to postgres database hosted on heroku. Anybody in the channel can use the bot.

After buying stocks, and they are posted to the database you can visit your portfolio at: https://gostock.herokuapp.com

Log in using the credentials that you used from the slack channel, and you will be greeted by the stocks you bought. 
Click on any of the stocks, and it will make an API call to the google stock api which returns a csv of the stock data from the first day of the month. This data is then parsed and displayed using a d3 table.
