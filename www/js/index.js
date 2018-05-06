/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	notificationId: 0,
	locked: false,

    // Application Constructor
    initialize: function() {
		$('.setup-dialog').slick({
			infinite: false,
			mobileFirst: true,
			touchThreshold: 100,
			waitForAnimate: false,
      prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">&#x23F4; Previous</button>',
      nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next &#x23F5;</button>',
		});
		$('#add-answer').click(function(){
			$('.answers').append('<input type="text">')
		});
		$('.slick-next').click(function(){
			if($(this).hasClass('slick-disabled')) {

				$('.setup-dialog').hide();
			}
		});
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
		cordova.plugins.backgroundMode.enable();
		$('#spyStart').click(this.startSpy.bind(this));
    },

	startSpy: function() {
		var check = this.checkLocked.bind(this);
		setInterval(function() {
			cordova.plugins.lockInfo.isLocked(
				check,
				check
			);
		}, 2000);
	},

	checkLocked: function(isLocked){
		if (isLocked) {
			this.locked = true;
		} else {
			if(this.locked) {
				this.notify('Really?');
				this.locked = false;
			}
		}
	},

	notify: function(message) {
		cordova.plugins.notification.local.schedule([
			{ id: this.notificationId, title: message }
		]);
		this.notificationId++;
	},

	isLocked: function() {

	},
};

app.initialize();