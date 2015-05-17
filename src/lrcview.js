define(function(require){

	var Lrc = require('./lrc');


	var LrvView = Lrc.extend({
		propertys:function(){
			this.wraper;
			this.box;
			this.subbox;
		},
		initialize:function($super,options){
			
			$super(options);
			this._initDom();
			this._updateLrcDom();
			this.on('update',function(){
				this._updateLrcDom();
			})
		},
		_setOption:function($super,options){
			$super(options);
			if(options.wraper){
				this.wraper = options.wraper;
			}
		},
		_initDom:function(){
			this.box = $('<div>');
			this.box.css({
				width:'100%',
				height:'100%',
				position:'relative'
			});
			this.subbox = $('<ul>');
			this.subbox.css({
				width:'100%',
				position:'absolute',
				left:'0px',
				top:'0px'
			});
			this.box.append(this.subbox);
			this.wraper.append(this.box);
		},
		_updateLrcDom:function(){
			this.subbox.empty();
			var lines = this.getLrc().lines,line,el;
			for(var i=0,l=lines.length;i<l;i++){
				line = lines[i];
				this.subbox.append($('<li>'+line.line+'</li>').attr('data-time',line.time).attr('data-id',line.id));
			}
		},
		pos:function($super,time){
			var bh = this.box.height()/2;
			var o = $super(time);
			if(o){
				var li = this.subbox.find('[data-id="'+o.id+'"]');
				li.position();
			}
			
		}
	});
	return LrvView;
});