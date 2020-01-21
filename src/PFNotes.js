'use strict';
import _ from 'underscore';
import {PFLog, PFConsole} from './PFLog';
import TAS from 'exports-loader?TAS!TheAaronSheet';
import PFConst from './PFConst';
import * as SWUtils from './SWUtils';



function registerEventHandlers () {
	on('change:repeating_contacts:relation', TAS.callback(function eventUpdatContactRelationChange(eventInfo) {
		getAttrs([eventInfo.triggerName+'-level'],function(v){

			var relationLevel = eventInfo.newValue,
				relation = '';
			if(relationLevel < -30)
				relation = 'Enmity';
			else if(relationLevel < -11)
				relation = 'Rivalty';
			else if(relationLevel < -5)
				relation = 'Competition';
			else if(relationLevel < 6)
				relation = 'Association';
			else if(relationLevel < 12)
				relation = 'Friendship';
			else if(relationLevel < 31)
				relation = 'Fellowship';
			else 
				relation = 'Devotion';
			var setter = {};
			setter[eventInfo.triggerName+'-level'] = relation;
			SWUtils.setWrapper(setter, PFConst.silentParams);
		})
	}));
}
registerEventHandlers();