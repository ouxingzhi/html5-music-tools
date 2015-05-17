define(function(require){

	var Class = require('./class');
	
	var typeset = {};
	var type = function(o){
		if(o === undefined) return 'undefined';
		if(o === null) return 'null';
		var t = ({}).toString.call(o);
		if(typeset[t]) return typeset[t];
		var tv = t.replace(/^\[object\s+|\]$/g,'').toLowerCase();
		return typeset[t] = tv;
	};

	var hasProp = function(o,n){
		return o.hasOwnProperty(n);
	};

	var each = function(l,fn,space,reverse){
		var t = type(l),i,e;
		if(t === 'array' || t === 'arguments' || l.length){
			if(reverse){
				for(i=l.length-1;i>-1;i--){
					if(fn.call(space,l[i],i,l)) return;
				}
			}else{
				for(i=0,e=l.length;i<e;i++){
					if(fn.call(space,l[i],i,l)) return;
				}
			}
		}else{
			for(i in l){
				if(hasProp(l,i) && fn.call(space,l[i],i,l)) return;
			}
		}
	}

	var indexOf = function(arr,o){
		var index = -1;
		var eq = function(v){ return v === o};
		if(typeof o === 'function') eq = o;
		each(arr||[],function(v,i){
			if(eq(v)){
				index = i;
				return true;
			}
		});
		return index;
	}

	var Event = Class({
		propertys:function(){
			this.__event = {};
		},
		on:function(type,fn,space,override){
			var e = this.__event;
			e[type] = e[type] || [];
			if(!override || indexOf(e[type],function(v){ return fn === v.fn;}) === -1){
				e[type].push({fn:fn,space:space});
			}
		},
		off:function(type,fn){
			var e = this.__event,index;
			e[type] = e[type] || [];
			if(fn){
				index = indexOf(e[type],function(v){ return fn === v.fn;});
				if(index > -1){
					e[type].splice(index,1);
				}
			}else{
				e[type] = [];
			}
		},
		emit:function(type,args){
			var e = this.__event,index,self = this;
			e[type] = e[type] || [];
			args = args || [];
			each(e[type],function(o){
				o.fn.apply(o.space || self,args);
			});
		}
	});
	return Event;
});