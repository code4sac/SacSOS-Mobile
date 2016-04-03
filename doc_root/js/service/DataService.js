/*jslint browser: true*/
/*global console, Framework7, hrApp*/

hrApp.angular.factory('DataService', ['$http', function ($http) {
  'use strict';

  var pub = {},
    eventListeners = {
      'resourceClicked' : []
     ,'commentClicked' : []
    };
  
  pub.addEventListener = function (eventName, callback) {
    eventListeners[eventName].push(callback);
  };
  
  pub.resourceClicked = function (resource) {
    for (var i=0; i<eventListeners.resourceClicked.length; i++) {
      eventListeners.resourceClicked[i](resource);
    }
  };
  
  pub.commentClicked = function (resource) {
	    for (var i=0; i<eventListeners.commentClicked.length; i++) {
	      eventListeners.commentClicked[i](resource);
	    }
 };
  
 
 pub.getComments = function(resource_id, resource_type){
	 return $http.get('get.php?table=comments&resource_id='+ resource_id + '&resource_type='+resource_type);
 };
 // http://api.helphubsac.org/api/search?action=index&controller=locations&keyword=meal&location=95831&org_name=&radius=2
 
  pub.getLocations = function (keyword, lat_lng) {
	  var queryString = encodeURI("?action=index&controller=locations&keyword="+ keyword +"&lat_lng="+ lat_lng.lat+','+lat_lng.lng); 	  
	  return $http({
	        url: 'http://api.helphubsac.org/api/search'+ queryString,
	        method: "GET",
	        withCredentials: true,
	        headers: { 'Content-Type': 'application/json; charset=utf-8' }
	    });	  	  
  };
  
  pub.getDetailInfo = function(slug){
	  //http://api.helphubsac.org/api/locations/weave
	  return $http({
	        url: 'http://api.helphubsac.org/api/locations/'+ slug,
	        method: "GET",
	        withCredentials: true,
	        headers: { 'Content-Type': 'application/json; charset=utf-8'  }
	    });	  
  }
  
  return pub;
  
}]);


///filter
hrApp.angular.filter('openFilter', function() {
	    return function(items, openToday) {
	    	/*
	        var i, c, txt = "";
	        x = x.split("")
	        for (i = 0; i < x.length; i++) {
	            c = x[i];
	            if (i % 2 == 0) {
	                c = c.toUpperCase();
	            }
	            txt += c;
	        }
	        return txt;
	        */
	/*    	
	    	if(openToday){
	    		var ret=[];
	    		var idx=0;
	    		for(var i in items){
	    			if(idx++ <2)
	    				ret.push(i);
	    		}
	    		return ret;
	    	}
	    	else */
	    		return items;
	    };
});