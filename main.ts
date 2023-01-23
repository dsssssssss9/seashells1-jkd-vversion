/**
 * Also Check correct Protocol is set on HUSKYLENS as well as make sure the HUSKYLENS is getting adequate power
 */
/**
 * If you don't get this far check the connections between HUSKYLENS & Micro:Bit
 */
/**
 * Display MAN icon to show system is ready
 */
/**
 * Set MOVE variable to FALSE
 */
/**
 * Clear Micro:Bit Screen
 */
/**
 * Start Communication between HuskyLens & Micro:Bit
 */
// Set MOVE variable to FALSE to "deactivate" the display part of the FOREVER block
// 
// Also turn off both Maqueen LED
// maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
// maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
input.onButtonPressed(Button.B, function () {
    Move = false
    basic.showIcon(IconNames.No)
    basic.pause(1000)
    DFRobotMaqueenPlusV2.controlMotorStop(MyEnumMotor.eAllMotor)
})
function TurnLeft () {
    DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eRightMotor, MyEnumDir.eForward, 100)
    DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eLeftMotor, MyEnumDir.eBackward, 100)
    // maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 25)
    basic.pause(1000)
    DFRobotMaqueenPlusV2.controlMotorStop(MyEnumMotor.eAllMotor)
    // maqueen.motorStop(maqueen.Motors.All)
    basic.pause(200)
    DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eRightMotor, MyEnumDir.eBackward, 100)
    DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eLeftMotor, MyEnumDir.eForward, 100)
    // maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
    // maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
    basic.pause(1000)
    DFRobotMaqueenPlusV2.controlMotorStop(MyEnumMotor.eAllMotor)
}
function backForward () {
    DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eAllMotor, MyEnumDir.eBackward, 100)
    // maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 25)
    basic.pause(1000)
    DFRobotMaqueenPlusV2.controlMotorStop(MyEnumMotor.eAllMotor)
    DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eAllMotor, MyEnumDir.eForward, 100)
    // maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 25)
    basic.pause(1000)
    DFRobotMaqueenPlusV2.controlMotorStop(MyEnumMotor.eAllMotor)
}
// Set MOVE variable to TRUE - this "activates" the display loop in the FOREVER block
// 
// Display TICK icon to show it has been activated
input.onButtonPressed(Button.A, function () {
    Move = true
    basic.showIcon(IconNames.Yes)
    basic.pause(1000)
})
function TurnRight () {
    DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eLeftMotor, MyEnumDir.eForward, 100)
    DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eRightMotor, MyEnumDir.eBackward, 100)
    // maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 25)
    basic.pause(1000)
    DFRobotMaqueenPlusV2.controlMotorStop(MyEnumMotor.eAllMotor)
    // maqueen.motorStop(maqueen.Motors.All)
    basic.pause(200)
    DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eLeftMotor, MyEnumDir.eBackward, 100)
    DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eRightMotor, MyEnumDir.eForward, 100)
    // maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
    // maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
    basic.pause(1000)
    DFRobotMaqueenPlusV2.controlMotorStop(MyEnumMotor.eAllMotor)
}
let Move = false
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.OBJECTCLASSIFICATION)
// maqueen.motorStop(maqueen.Motors.All)
basic.clearScreen()
Move = false
basic.showIcon(IconNames.Happy)
// Request latest result from HUSKYLENS at start of FOREVER so that each time it repeats it has the latest result
// 
// If MOVE variable is set to TRUE - show the recognised ID# from the HUSKYLENS & display its number / light LED based on the result
// 
// If MOVE is set to FALSE turn off BOTH MaQueen LED & Display X on MicroBit
basic.forever(function () {
    huskylens.request()
    if (Move) {
        // maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 25)
        // maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
        // maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
        if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            TurnRight()
        } else if (huskylens.isAppear(2, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            TurnLeft()
        } else if (huskylens.isAppear(3, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            backForward()
        }
    } else {
        DFRobotMaqueenPlusV2.controlMotorStop(MyEnumMotor.eAllMotor)
    }
})
