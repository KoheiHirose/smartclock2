/***********************************************
 
* JavaScript Alarm Clock- by JavaScript Kit (www.javascriptkit.com)
* This notice must stay intact for usage
* Visit JavaScript Kit at http://www.javascriptkit.com/ for this script and 100s more
 
***********************************************/
var jsalarm = {
    padfield: function (f) {
        return (f < 10) ? "0" + f : f
    },
    showcurrenttime: function () {
        var birds = document.getElementsByClassName('bird')
        var birds1 = document.getElementsByClassName('bird1')
        var birds2 = document.getElementsByClassName('bird2')
        var birds3 = document.getElementsByClassName('bird3')
        var birds4 = document.getElementsByClassName('bird4')
        var birds5 = document.getElementsByClassName('bird5')
        var birds6 = document.getElementsByClassName('bird6')
        var birds7 = document.getElementsByClassName('bird7')
        var birds8 = document.getElementsByClassName('bird8')
        var birds9 = document.getElementsByClassName('bird9')
        var birds10 = document.getElementsByClassName('bird10')
        var birds11 = document.getElementsByClassName('bird11')
        var birds12 = document.getElementsByClassName('bird12')
        var birdsarray = [birds1, birds2, birds3, birds4, birds5, birds6, birds7, birds8, birds9, birds10, birds11, birds12]
        var nature_sounds = document.getElementsByClassName('nature')
        var classics = document.getElementsByClassName('classical_music')
        var dateobj = new Date()
        var ct = this.padfield(dateobj.getHours()) + ":" + this.padfield(dateobj.getMinutes()) + ":" + this.padfield(dateobj.getSeconds())
        var ct2 = this.padfield(dateobj.getMinutes()) + ":" + this.padfield(dateobj.getSeconds())
        this.ctref.innerHTML = ct
        this.ctref.setAttribute("title", ct)
        this.alarm1ref.innerHTML = this.hourselect.options[this.hourselect.selectedIndex].value + ":" + this.minuteselect.options[this.minuteselect.selectedIndex].value + ":" + this.secondselect.options[this.secondselect.selectedIndex].value
        this.alarm2ref.innerHTML = this.hourselect2.options[this.hourselect2.selectedIndex].value + ":" + this.minuteselect2.options[this.minuteselect2.selectedIndex].value + ":" + this.secondselect2.options[this.secondselect2.selectedIndex].value
        this.alarm3ref.innerHTML = this.hourselect3.options[this.hourselect3.selectedIndex].value + ":" + this.minuteselect3.options[this.minuteselect3.selectedIndex].value + ":" + this.secondselect3.options[this.secondselect3.selectedIndex].value
        if (typeof this.hourwake != "undefined") { //if alarm is set
            if (ct2 == (/*this.hourwake + ":" + */this.minutewake + ":" + this.secondwake)) {
                //clearInterval(jsalarm.timer)
                //window.location = document.getElementById("musicloc").value
                //window.open(document.getElementById("musicloc").value)
                //alert(document.getElementById("audio").src)
                //setInterval(function(){window.close}, 5000)
                birdsarray[dateobj.getMonth()][Math.floor(Math.random() * birdsarray[dateobj.getMonth()].length)].play()
            } else if (this.ctref.title == (this.hourwake2 + ":" + this.minutewake2 + ":" + this.secondwake2)) {
                nature_sounds[Math.floor(Math.random() * nature_sounds.length)].play()
            } else if (this.ctref.title == (this.hourwake3 + ":" + this.minutewake3 + ":" + this.secondwake3)) {
                classics[Math.floor(Math.random() * classics.length)].play()
            }
        }
    },
    showcurrentdate: function () {
        var dateobj = new Date()
        var dayofweeklist = ["日", "月", "火", "水", "木", "金", "土"]
        var today = this.padfield(dateobj.getFullYear()) + "/" + this.padfield(dateobj.getMonth() + 1) + "/" + this.padfield(dateobj.getDate()) + "(" + dayofweeklist[dateobj.getDay()] + ")"
        this.todayref.innerHTML = today
    },
    showcurrentweather: function () {
        var xhr = new XMLHttpRequest()
        var weathericons = { "晴れ": "☀", "晴": "☀", "雨": "☂", "曇り": "☁", "曇": "☁", "雪": "❄", "時々": "|", "一時": "/", "のち": "/", "後": "/" }
        var weathercolors = { "晴れ": "RGB(232,194,56)", "晴": "RGB(232,194,56)", "雨": "RGB(14,164,132)", "曇り": "RGB(220,215,198)", "曇": "RGB(220,215,198)", "雪": "RGB(125,218,251)", "時々": "RGB(179,169,133)", "一時": "RGB(179,169,133)", "のち": "RGB(179,169,133)", "後": "RGB(179,169,133)" }
        xhr.open('GET', "https://weather.tsukumijima.net/api/forecast/city/460010");
        xhr.send()
        xhr.onload = () => {
            var responseJson = JSON.parse(xhr.response)
            var weather = responseJson.forecasts[0].telop
            var weatherarray = weather.split(/(時々)|(一時)|(のち)|(後)/).filter(function (el) { return el; });
            if (weatherarray.length > 1) {
                for (let i = 0; i < weatherarray.length; i++) {
                    this.weatherref[i].innerHTML = weathericons[weatherarray[i]]
                    this.weatherref[i].style.color = weathercolors[weatherarray[i]]
                }
            } else {
                this.weatherref[0].innerHTML = weathericons[weatherarray[0]]
                this.weatherref[0].style.color = weathercolors[weatherarray[0]]
            }
        }
    },
    init: function () {
        var dateobj = new Date()
        this.ctref = document.getElementById("jsalarm_ct")
        this.todayref = document.getElementById("todaysdate")
        this.weatherref = document.getElementsByClassName("todaysweather")
        this.alarmconfigref = document.getElementById("alarmconfigbutton")
        this.alarm1ref = document.getElementById("From")
        this.alarm2ref = document.getElementById("Break")
        this.alarm3ref = document.getElementById("To")
        //        this.inputref = document.getElementById("inputbutton")
        //        this.inputref.onclick = function () {
        //            jsalarm.inputalarm()
        //            //this.value = "Alarm Set"
        //            //this.disabled = true
        //            return false
        //        }
        this.setref = document.getElementById("setbutton")
        this.setref.onclick = function () {
            if (this.value == "SET") {
                jsalarm.setalarm()
                this.value = "UNSET"
                jsalarm.alarmconfigref.disabled = true
            } else {
                jsalarm.hourwake = undefined
                //jsalarm.hourwake2 = undefined
                //jsalarm.hourwake3 = undefined
                this.value = "SET"
                jsalarm.alarmconfigref.disabled = false
            }
            //this.disabled = true
            return false
        }
        //        this.resetref = document.getElementById("resetbutton")
        //        this.resetref.onclick = function () {
        //            jsalarm.submitref.disabled = false
        //
        //            jsalarm.hourwake = undefined
        //            jsalarm.hourselect.disabled = false
        //            jsalarm.minuteselect.disabled = false
        //            jsalarm.secondselect.disabled = false
        //
        //            jsalarm.hourwake2 = undefined
        //            jsalarm.hourselect2.disabled = false
        //            jsalarm.minuteselect2.disabled = false
        //            jsalarm.secondselect2.disabled = false
        //
        //            jsalarm.hourwake3 = undefined
        //            jsalarm.hourselect3.disabled = false
        //            jsalarm.minuteselect3.disabled = false
        //            jsalarm.secondselect3.disabled = false
        //            return false
        //        }
        this.hourinit = this.padfield(8)
        this.minuteinit = this.padfield(0)
        this.secondinit = this.padfield(0)
        this.hourinit2 = this.padfield(11)
        this.minuteinit2 = this.padfield(15)
        this.secondinit2 = this.padfield(0)
        this.hourinit3 = this.padfield(16)
        this.minuteinit3 = this.padfield(45)
        this.secondinit3 = this.padfield(0)
        var selections = document.getElementsByTagName("select")
        this.hourselect = selections[0]
        this.minuteselect = selections[1]
        this.secondselect = selections[2]
        this.hourselect2 = selections[3]
        this.minuteselect2 = selections[4]
        this.secondselect2 = selections[5]
        this.hourselect3 = selections[6]
        this.minuteselect3 = selections[7]
        this.secondselect3 = selections[8]
        for (var i = 0; i < 60; i++) {
            if (i < 24) {//If still within range of hours field: 0-23
                this.hourselect[i] = new Option(this.padfield(i), this.padfield(i), false, this.hourinit == this.padfield(i)) //dateobj.getHours()->8 //another option: this.padfield(i)->i
                this.hourselect2[i] = new Option(this.padfield(i), this.padfield(i), false, this.hourinit2 == this.padfield(i)) //dateobj.getHours()->12
                this.hourselect3[i] = new Option(this.padfield(i), this.padfield(i), false, this.hourinit3 == this.padfield(i)) //dateobj.getHours()->16
            }
            this.minuteselect[i] = new Option(this.padfield(i), this.padfield(i), false, this.minuteinit == this.padfield(i)) //dateobj.getMinutes()->0
            this.minuteselect2[i] = new Option(this.padfield(i), this.padfield(i), false, this.minuteinit2 == this.padfield(i)) //dateobj.getMinutes()->0
            this.minuteselect3[i] = new Option(this.padfield(i), this.padfield(i), false, this.minuteinit3 == this.padfield(i)) //dateobj.getMinutes()->45
            this.secondselect[i] = new Option(this.padfield(i), this.padfield(i), false, this.secondinit == this.padfield(i)) //dateobj.getSeconds()->0
            this.secondselect2[i] = new Option(this.padfield(i), this.padfield(i), false, this.secondinit2 == this.padfield(i)) //dateobj.getSeconds()->0
            this.secondselect3[i] = new Option(this.padfield(i), this.padfield(i), false, this.secondinit3 == this.padfield(i)) //dateobj.getSeconds()->0
        }
        jsalarm.showcurrenttime()
        jsalarm.showcurrentdate()
        jsalarm.showprogress()
        jsalarm.timer = setInterval(function () { jsalarm.showcurrenttime(); jsalarm.showcurrentdate(); jsalarm.showprogress() }, 1000)
        jsalarm.showcurrentweather()
        jsalarm.timer = setInterval(function () { jsalarm.showcurrenttime(); jsalarm.showcurrentdate() }, 60 * 60 * 1000)
    },
    //    inputalarm: function() {
    //        this.hourset = this.hourselect.options[this.hourselect.selectedIndex].value
    //        this.minuteset = this.minuteselect.options[this.minuteselect.selectedIndex].value
    //        this.secondset = this.secondselect.options[this.secondselect.selectedIndex].value
    //        //this.hourselect.disabled = true
    //        //this.minuteselect.disabled = true
    //        //this.secondselect.disabled = true
    //
    //        this.hourset2 = this.hourselect2.options[this.hourselect2.selectedIndex].value
    //        this.minuteset2 = this.minuteselect2.options[this.minuteselect2.selectedIndex].value
    //        this.secondset2 = this.secondselect2.options[this.secondselect2.selectedIndex].value
    //        //this.hourselect2.disabled = true
    //        //this.minuteselect2.disabled = true
    //        //this.secondselect2.disabled = true
    //
    //        this.hourset3 = this.hourselect3.options[this.hourselect3.selectedIndex].value
    //        this.minuteset3 = this.minuteselect3.options[this.minuteselect3.selectedIndex].value
    //        this.secondset3 = this.secondselect3.options[this.secondselect3.selectedIndex].value
    //        //this.hourselect3.disabled = true
    //        //this.minuteselect3.disabled = true
    //        //this.secondselect3.disabled = true
    //    },
    setalarm: function () {
        this.hourwake = this.hourselect.options[this.hourselect.selectedIndex].value //this.hourset
        this.minutewake = this.minuteselect.options[this.minuteselect.selectedIndex].value //this.minuteset
        this.secondwake = this.secondselect.options[this.secondselect.selectedIndex].value //this.secondset

        this.hourwake2 = this.hourselect2.options[this.hourselect2.selectedIndex].value //this.hourset2
        this.minutewake2 = this.minuteselect2.options[this.minuteselect2.selectedIndex].value //this.minuteset2
        this.secondwake2 = this.secondselect2.options[this.secondselect2.selectedIndex].value //this.secondset2

        this.hourwake3 = this.hourselect3.options[this.hourselect3.selectedIndex].value //this.hourset3
        this.minutewake3 = this.minuteselect3.options[this.minuteselect3.selectedIndex].value //this.minuteset3
        this.secondwake3 = this.secondselect3.options[this.secondselect3.selectedIndex].value //this.secondset3
    },
    //    setalarm: function () {
    //        this.hourwake = this.hourselect.options[this.hourselect.selectedIndex].value
    //        this.minutewake = this.minuteselect.options[this.minuteselect.selectedIndex].value
    //        this.secondwake = this.secondselect.options[this.secondselect.selectedIndex].value
    //        this.hourselect.disabled = true
    //        this.minuteselect.disabled = true
    //        this.secondselect.disabled = true
    //
    //        this.hourwake2 = this.hourselect2.options[this.hourselect2.selectedIndex].value
    //        this.minutewake2 = this.minuteselect2.options[this.minuteselect2.selectedIndex].value
    //        this.secondwake2 = this.secondselect2.options[this.secondselect2.selectedIndex].value
    //        this.hourselect2.disabled = true
    //        this.minuteselect2.disabled = true
    //        this.secondselect2.disabled = true
    //
    //        this.hourwake3 = this.hourselect3.options[this.hourselect3.selectedIndex].value
    //        this.minutewake3 = this.minuteselect3.options[this.minuteselect3.selectedIndex].value
    //        this.secondwake3 = this.secondselect3.options[this.secondselect3.selectedIndex].value
    //        this.hourselect3.disabled = true
    //        this.minuteselect3.disabled = true
    //        this.secondselect3.disabled = true
    //    }
    showprogress: function () {
        var dateobj = new Date()
        var starttime = Number(this.hourwake) * 60 * 60 + Number(this.minutewake) * 60 + Number(this.secondwake)
        var closetime = Number(this.hourwake3) * 60 * 60 + Number(this.minutewake3) * 60 + Number(this.secondwake3)
        var currenttime = dateobj.getHours() * 60 * 60 + dateobj.getMinutes() * 60 + dateobj.getSeconds()
        var timepercentage = (currenttime - starttime) / (closetime - starttime) * 100
        if (timepercentage >= 0 && timepercentage <= 100 && typeof this.hourwake != "undefined") {
            document.getElementById("timeprogress").value = timepercentage
        } else {
            document.getElementById("timeprogress").value = 0
        }
    },
}

