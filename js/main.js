/* ! Copyright (c) 2021, Samsung Electronics Co., Ltd


* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
 

* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
 

* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE. */

//Initialize function
var init = function () {
    // TODO:: Do your initialization job
    log('init() called');
	tizen.tvinputdevice.registerKeyBatch(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'ColorF0Red', 'ColorF1Green', 'ColorF2Yellow', 'ColorF3Blue']);
    
    document.addEventListener('visibilitychange', function() {
        if(document.hidden){
            // Something you want to do when hide or exit.
        } else {
            // Something you want to do when resume.
        }
    });
 
    // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	switch (e.keyCode) {
			case 37: //Left arrow
                getDST(); 
			break;
			case 39: //Right arrow
				setDST();
			break;
			case 38: //UP arrow
                 getSyncTimeout();
            	break;
            case 40: //DOWN arrow
                 setSyncTimeout();
            	break;
			case 48: //0
					log("n/a");
				break;
			case 49: //1
					setCurrentTime();
				break;
			case 50: //2
					getCurrentTime();
				break;
			case 51: //3
					setOnTimer();
				break;
			case 52: //4
					getOnTimer();
				break;
			case 53: //5
					setOffTimer();
				break;
			case 54: //6
					getOffTimer();
				break;
			case 55: //7
					addHoliday();
				break;
			case 56: //8
					deleteHoliday();
				break;
			case 57: //9
					log("n/a");
				break;
			case 403: // RED
					applyTimerHoliday();
				break;
			case 404: // GREEN
					getTimerHoliday();
				break;
			case 405: // YELLOW
					setNtp();
				break;
			case 406: // BLUE
					getNtp();
				break;
	}
    });
};
// window.onload can work without <body onload="">
window.onload = init;

function log(msg) {
	var logsEl = document.getElementById('logs');

	if (msg) {
		// Update logs
		logsEl.innerHTML += msg + '<br />';
	} else {
		// Clear logs
		logsEl.innerHTML = '';
	}

	logsEl.scrollTop = logsEl.scrollHeight;
}


// get module version
var Version = null;
 
var getTimerVersion = function(){
 	try {
 		Version = webapis.timer.getVersion();
 	} catch (e) {
 		log("[getVersion] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
 	}
 
 	if (null !== Version) {
 		log("[getVersion] call syncFunction type: " + Version);	
 	}
};

// set current time
var setCurrentTime = function(){
var current_time = {
		 		"year" 	   : 2022,
		 		"month"    : 12,
		 		"day": 15,
		 		"hour"     : 8,
		 		"minute"   : 55,
		 		"second"   : 43
		 	};
		 
		  	try {
		 		webapis.timer.setCurrentTime(current_time);
		  	} catch (e) {
		  		log("[setCurrentTime] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
		  	}
};

// get current time
var getCurrentTime = function(){
var CurrentTime = null;

	try {
		CurrentTime = webapis.timer.getCurrentTime();
	} catch (e) {
		log("[getCurrentTime] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	}

	if (null !== CurrentTime) {
		log("[getCurrentTime] call syncFunction type: " + CurrentTime);
	}	
};

// set timer to power on the device
var setOnTimer = function(){
var timer_profile1 = {
 		"timerID" 	  : "TIMER1", // from TIMER1 TO TIMER7
 		"time"        : "19:50", // hour is 0 to 24, and minute 0 to 59
 		"setup"       : "TIMER_ONCE", // or TIMER_OFF, TIMER_EVERYDAY, TIMER_MON_FRI, TIMER_SAT_SUN, TIMER_MANUAL 
 		"volume"      :  10 // from 0 to 99
 	};
 	var timer_profile2 = {
 		"timerID" 	  : "TIMER2",
 		"time"        : "19:50",
 		"setup"       : "TIMER_MANUAL", // allows to set timer for specific days
 		"volume"      :  10,
        "manual"	  : ["SUN", "WED"] // SUN, MON, TUE, WED, THU, FRI, SAT
 	};
 
  	try {
  		webapis.timer.setOnTimer(timer_profile1);	
  	} catch (e) {
  		log("[setOnTimer] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
  	}
};

//get information about on timer
var getOnTimer = function(){
	var OnTimer = null;
	try {
		OnTimer = webapis.timer.getOnTimer("TIMER1");
	} catch (e) {
		log("[getOnTimer] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	}

	if (null !== OnTimer) {
		log("[getOnTimer] call syncFunction Timer : " + OnTimer);
	}		
}

// set timer to power off the device
var setOffTimer = function(){
	var timer_profile = {
	 		"timerID" 	  : "TIMER1",
	 		"time"        : "19:50",
	 		"setup"       : "TIMER_ONCE"
	 	};
	 
	  	try {
	  		webapis.timer.setOffTimer(timer_profile);	
	  	} catch (e) {
	  		log("[setOffTimer] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	  	}
};

//get information about off timer
var getOffTimer = function(){
var OffTimer = null;

	try {
		OffnTimer = webapis.timer.getOffTimer("TIMER1");
	} catch (e) {
		log("[getOffTimer] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	}

	if (null !== OffTimer) {
		log("[getOffTimer] call syncFunction Timer : " + OffTimer);
	}		
};

//add holiday timer
var addHoliday = function(){
var ADD_Holiday_profile = {
 		"startMonth" :  8, // 1 - 12
 		"startDay"   :  15, // 1 - 31
 		"endMonth"   :  10, // 1 - 12
 		"endDay"     :  18 // 1 - 31
 	};
 
 	try {
 		webapis.timer.addHoliday(ADD_Holiday_profile);
 	} catch (e) {
 		log("[addHoliday] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
 	}
};

//delete holiday timer
var deleteHoliday = function(){
var DEL_Holiday_profile = {
 		"startMonth" :  8,
 		"startDay"   :  15,
 		"endMonth"   :  10,
 		"endDay"     :  18		
   };
   
 	try {
 		webapis.timer.deleteHoliday(DEL_Holiday_profile);
 	} catch (e) {
 		log("[deleteHoliday] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
 	}
};

//set holiday timer
var applyTimerHoliday = function(){
var timer_profile = {
 		"type" 		   :  "OnTimer", // OnTimer or OffTimer
 		"timerID"      :  "TIMER1", // from TIMER1 to TIMER7
 		"timerOnOff"   :  "ON" // activation value ON or OFF
    };
    
 	try {
 		webapis.timer.applyTimerHoliday(timer_profile);
 	} catch (e) {
 		log("[deleteHoliday] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
 	}
};

//get holiday list
var getTimerHoliday = function(){
var Holiday = null;
	var timer_profile = {
		"type" 		   :  "OnTimer",
		"timerID"      :  "TIMER1"
};

	try {
		Holiday = webapis.timer.getTimerHoliday(timer_profile);
	} catch (e) {
		log("[getHoliday] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
	}

	if (null !== Holiday) {
		log("[getHoliday] call syncFunction type: " + Holiday);
	}		
}

//set NTP
var setNtp = function(){
var ntpinfo = {
 		"use"       : "ON", // NTP use set to ON or OFF
 		"address"   : "10.89.10.13", // NTP address
   	"timeZone"  : "Asia/Seoul"
 	};
 
  	try {
  		webapis.timer.setNTP(ntpinfo);
  	} catch (e) {
  		log("[setNTP] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
  	}
};

//get NTP information
var getNtp = function(){
var ntpinfo= null;

try {
    ntpinfo = webapis.timer.getNTP();
} catch (e) {
    log("[getNTP] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
}
};

//set DST
var setDST = function(){ // daylight saving time
var DSTInfo = {
  		"mode"    :  "ON",
  		"start"   :  {
   		"month" 	 :  10,
   		"week"  	 :  3,
   		"dayofweek"  : "MON",
 			"hour"  	 :  8,
 			"minute"	 :  22 },
  		"end"     : {
   		"month" 	 :  11,
   		"week"  	 :  9,
   		"dayofweek"  : "MON",
   		"hour"  	 :  13,
   		"minute"	 :  58 },		
   	"offset":  "+1" // 1 hour offset
   };
  
   try {
      webapis.timer.setDST(DSTInfo);
   } catch (e) {
      log("[setDST] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
   }
}

//get DST information
var getDST = function(){
	var DSTMode = null;
	  
  	try {
  		DSTMode = webapis.timer.getDST();
  	} catch (e) {
  		log("[getDST] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
  	}
  
  	if (null !== DSTMode) {
  		log("[getDST] call syncFunction type: " + DSTMode);
  	}
};

// Timeout for System/Kernel Time to be set as Menu time if fail to set through samsung server.
var setSyncTimeout = function(){   
var timeout = "30SEC"; // 30SEC, 45SEC, 60SEC, 75SEC, 90SEC, 105SEC, 120SEC

try {
    webapis.timer.setSystemTimeSyncTimeout(timeout);
} catch (e) {
    log("[setSystemTimeSyncTimeout] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
}
};

//Retrieve timeout value for System/Kernel time
var getSyncTimeout = function(){
var TIMEOUT = null;

try {
    TIMEOUT = webapis.timer.getSystemTimeSyncTimeout();
} catch (e) {
    log("[getSystemTimeSyncTimeout] call syncFunction exception [" + e.code + "] name: " + e.name + " message: " + e.message);
}

if (null !== TIMEOUT) {
    log("[getSystemTimeSyncTimeout] call syncFunction type: " + TIMEOUT);
} 
};