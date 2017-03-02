const electron = require('electron')
// Module to control application life.

const {ipcMain} =require('electron')
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const MasterCard = require('./payments/mastercard-payment')
const PayPal = require('./payments/paypal-payment')
const Blockchain = require('./blockchain/chainrequest')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
    // Create the browser window. 375 × 667
    mainWindow = new BrowserWindow({width: 414, height: 736})

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'www/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    //mainWindow.webContents.openDevTools()



    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }

})


ipcMain.on('mastercardPayment', function(event, args){
    console.log('paymentssss', args)

    MasterCard(args.fundingNumber, args.amount, function(err, res){
        console.log('all good')
        if(err) console.log('mastercard error')
        Blockchain.write('mastercard', args.amount,function(err, result) {

            event.sender.send('mastercardPayed', {error: err, data: result})
        })
    })


})

ipcMain.on('paypalPayment', function(event, args){

    PayPal(args.amount, function(result){

        Blockchain.write('paypal', args.amount,function(err, result){
            if(err) console.error('jerre')

            event.sender.send('paypalPayed', {error:err,data:result})
        })


    })


})
/*
const {ipcRenderer} = require('electron')

ipcRenderer.send('mastercardPayment', {amount:amount, fundingNumber:number})

ipcRenderer.on('mastercardPayed', function(event, args){

})

ipcRenderer.send('paypalPayment', amount)

 ipcRenderer.on('paypalPayed', function(event, args){

 })
*/