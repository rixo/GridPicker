Ext.application({

	name: 'GridPickerDemo'

	,paths: {
		'Ext.ux': '../ux'
	}

	,requires: [
		'Ext.ux.Rixo.form.field.GridPicker',
		'Ext.grid.feature.Grouping'
	]

	,controllers: [
		'Performance'
	]

	,refs: [{
		ref: 'progressBar'
		,selector: '#progressBar'
	},{
		ref: 'ouputWindow'
		,selector: '#outputWindow'
	}]

	,init: function() {
		this.control({
			'#outputWindow': {
				add: function(window, component) {
					component.on({
						single: true
						,delay: 100
						,afterrender: function() {
							window.body.scroll('bottom', Number.MAX_VALUE, true);
						}
					});
				}
			}
		});
	}

	,getProgressBar: function() {
		return this.getOuputWindow().add({
			xtype: 'progressbar'
			,autoShow: true
		});
	}

	,launch: function() {

		Ext.widget('panel', {
			renderTo: Ext.getBody()
			,title: "Log"
			,id: 'outputWindow'
			,bodyPadding: 5
			,width: 300
			,height: '75%'
			,autoShow: true
			,layout: {
				type: 'vbox'
				,align: 'stretch'
			}
			,defaults: {
				xtype: 'component'
				,margin: '2 0'
			}
			,autoScroll: true
			,floating: true
			,tbar: [{
				xtype: 'numberfield'
				,value: this.getQueryVariable('n', 10000)
				,minValue: 0
				,fieldLabel: "Number of records: "
				,labelWidth: 110
				,listeners: {
					specialkey: function(field, e){
						if (e.getKey() == e.ENTER) {
							this.nextSibling().handler();
						}
					}

				}
			},{
				xtype: 'button'
				,text: 'Go'
				,handler: function() {
					window.location.search = "?n=" + this.previousSibling().getValue();
				}
			}]
		}).anchorTo(Ext.getBody(), 'r-r');

		this.getSampleData(function(sampleData) {

			this.getOuputWindow().add({
				tpl: "Created {n} random records"
				,data: {n: sampleData.length}
			});

			this.createItems(sampleData, function(items) {
				Ext.widget('window', {
					autoShow: true
					,layout: 'fit'
					,width: 400
					,items: [{
						xtype: 'form'
						,bodyPadding: 10
						,border: false

						,items: [{
							xtype: 'form'
							,border: false
							,defaults: {
								xtype: 'fieldset'
								,defaults: {
									anchor: '100%'
								}
							}
							,items: [{
								title: "Grid pickers"
								,items: items.filter(function(item) {
									return item instanceof Ext.ux.Rixo.form.field.GridPicker;
								})
							},{
								title: "Regular combo boxes"
								,items: items.filter(function(item) {
									return item instanceof Ext.ux.Rixo.form.field.GridPicker === false;
								})
							}]
							,flex: 1
						},{
							xtype: 'component'
							,height: 100
							,itemId: 'dataOutput'
							,tpl: '<pre>{out}</pre>'
						}]
					}]
				});
			}, this);
		}, this);
	}

	,getQueryVariable: function getQueryVariable(variable, $default) {
		var query = window.location.search.substring(1);
		var vars = query.split('&');
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=');
			if (decodeURIComponent(pair[0]) == variable) {
				return decodeURIComponent(pair[1]);
			}
		}
		return $default;
	}

	,getSampleData: function(callback, scope) {

		if (this.data) {
			return Ext.callback(callback, scope, [this.data]);
		}

		var progressBar = this.getProgressBar(),
			data = this.data = [],
			n = this.getQueryVariable('n', 10000);

		var lipsum = "lorem ipsum dolor sit amet consectetur adipiscing elit vivamus aliquam nunc " +
				"vel enim porta sit amet rhoncus dui auctor vivamus posuere porta pulvinar proin eu " +
				"lectus gravida porttitor quam id tincidunt velit nulla molestie orci ante sed rhoncus " +
				"ipsum gravida in sed porttitor velit a bibendum dictum integer nec fermen dolor vitae " +
				"scelerisque enim quisque vulputate turpis sit amet libero porttitor vel rhoncus metus " +
				"facilisis donec consectetur lorem vitae aliquam posuere felis dolor porttitor ipsum sed " +
				"lacinia leo arcu ac ligula praesent feugiat commodo scelerisque aliquam mauris purus " +
				"faucibus eget mi in pharetra laoreet metus quisque consectetur quam ut vulputate " +
				"pharetra sed euismod velit ac eros auctor blandit duis posuere lectus arcu duis viverra " +
				"tristique rutrum sed gravida rutrum adipiscing sed interdum augue ut sem commodo posuere " +
				"vestibulum ipsum odio consequat quis aliquam et condimentum ut magna proin porta " +
				"sollictudin diam sed euismod dui semper sed aenean ut suscipit tellus cras id leo lacus " +
				"phasellus gravida lobortis dapibus sed iaculis consequat auctor proin pellentesque odio " +
				"et dolor vulputate at vulputate augue facilisis vivamus semper ipsum nibh id faucibus " +
				"metus faucibus ac cum sociis natoque penatibus et magnis dis parturient montes nascetur " +
				"ridiculus mus ut a justo a eros euismod bibendum integer convallis nibh at tortor " +
				"pharetra sit amet pretium lorem semper nam ultrices consequat lectus ut varius enim " +
				"dapibus quis sed et magna felis mauris ut scelerisque erat in adipiscing arcu curabitur " +
				"at aliquam turpis in accumsan eros maecenas ut congue ante etiam feugiat congue dolor " +
				"vitae varius morbi sed convallis velit eget viverra purus cras luctus ante ac arcu " +
				"vulputate ornare vestibulum id ante turpis etiam dapibus nulla eu ullamcorper fringilla " +
				"massa nisl ornare leo ut pharetra lacus diam nec felis integer mollis interdum justo a " +
				"euismod fusce ac elit blandit luctus libero non scelerisque nibh sed dignissim odio",
			words = lipsum.split(' '),
			hits = {};

		words = words.filter(function(word) {
			var present = hits[word];
			hits[word] = true;
			return !present && word.length > 4;
		});

		words.rand = function(n) {
			n = n || 1;
			var buf = [], word;
			while (n--) buf.push(this[Math.floor(Math.random() * this.length)]);
			word = buf.join(' ');
			return word.substr(0,1).toUpperCase() + word.substr(1);
		};

		progressBar.updateText("Generation of example data set " + 0 + "/" + n);

		var chunkSize = n / 100,
			remaining = n;

		function next() {
			var j = 0;

			while (remaining && j++ < chunkSize) {
				data.unshift([remaining, words.rand(3)]);
				remaining--;
			}

			progressBar.updateProgress((n - remaining) / n);
			progressBar.updateText("Generation of example data set " + (n - remaining) + "/" + n);

			if (remaining) {
				Ext.Function.defer(next, 1, this);
			} else {
				progressBar.destroy();
				Ext.callback(callback, scope, [data]);
			}
		}

		Ext.Function.defer(next, 1, this);

		return data;
	}

	,createItems: function(sampleData, callback, scope) {
		var me = this;

		var configs = [{
			xclass: 'Ext.ux.Rixo.form.field.GridPicker'

			,name: 'grid'
			,fieldLabel: "Grid"

			,minChars: 0
			,queryDelay: 0

			,valueField: 'id'
			,forceSelection: true
			,selectOnFocus: true
			,typeAhead: true

			,store: {
				fields: ['id', 'text']
				,proxy: {
					type: 'memory'
					,reader: 'array'
					,enablePaging: true
				}
				,sorters: {
					property: 'text', order: 'ASC'
				}
				,data: sampleData
				,pageSize: 999999
				,autoLoad: true
				// ,buffered: true
			}
			,triggerAction: 'query'

			,gridConfig: {
				maxHeight: 200

				,emptyText: "No match"

				,selModel: {
					pruneRemoved: false
				}

				,plugins: {
					ptype: 'bufferedrenderer',
					trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
					leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
				}
			}
		},{
			xclass: 'Ext.ux.Rixo.form.field.GridPicker'

			,name: 'groupingGrid'
			,fieldLabel: "Grouping grid"

			,minChars: 0
			,queryDelay: 0

			,valueField: 'id'
			,forceSelection: true
			,selectOnFocus: true
			,triggerAction: 'query'

			,listeners: {
				single: true
				,beforequery: function() {
					this.queryFilter.anyMatch = true;
				}
			}

			,store: {
				fields: ['id', 'text', {
					name: 'group'
					,convert: function() {
						var re = /^(\w*)/;
						return function(v, record) {
							return re.exec(record.get('text'))[0];
						}
					}()
				}]
				,proxy: {
					type: 'memory'
					,reader: 'array'
					,enablePaging: true
				}
				,sorters: {
					property: 'text', order: 'ASC'
				}
				,data: sampleData
				,pageSize: 999999
				,autoLoad: true
				,groupField: 'group'
			}

			,gridConfig: {
				maxHeight: 200
				,features: [{
					ftype:'grouping'
					,groupHeaderTpl: '{name}'
					,collapsible: false
				}]

				,emptyText: "No match"

				,selModel: {
					pruneRemoved: false
				}

				,plugins: {
					ptype: 'bufferedrenderer',
					trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
					leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
				}
			}
		},{
			xtype: 'combo'
			,name: 'combo'
			,fieldLabel: "Combo"

			,listConfig: {
				resizable: true
			}

			,queryMode: 'local'

			,store: {
				fields: ['id', 'text']
				,proxy: {
					type: 'memory'
					,reader: 'array'
					,enablePaging: true
				}
				,sorters: {
					property: 'text', order: 'ASC'
				}
				,data: sampleData
				,pageSize: 999999
			}
		},{
			xtype: 'combo'
			,name: 'pagedCombo'
			,fieldLabel: "Paged combo"

			,queryMode: 'local'
			,minChars: 3

			,listConfig: {
				resizable: true
			}

			,store: {
				fields: ['id', 'text']
				,proxy: {
					type: 'memory'
					,reader: 'array'
					,enablePaging: true
				}
				,sorters: {
					property: 'text', order: 'ASC'
				}
				,data: sampleData
				,pageSize: 100
			}
			,pageSize: 100
		}];

		var progressBar = this.getProgressBar(),
			n = configs.length,
			items = [];

		progressBar.updateText("Creation of combos " + (0) + "/" + n);

		function next() {
			var config = configs.shift(),
				remaining= configs.length,
				start = new Date,
				end, field;

			field = config.xclass && Ext.create(config) || Ext.widget(config);
			items.push(field);
			end = new Date;

			progressBar.updateProgress((n - remaining) / n);
			progressBar.updateText("Creation of combos " + (n - remaining) + "/" + n);

			me.getOuputWindow().add({
				tpl: '{name} creation time: {time} ms'
				,data: {
					name: field.getFieldLabel()
					,time: end - start
				}
			});

			if (remaining) {
				Ext.Function.defer(next, 1);
			} else {
				var win = me.getOuputWindow();
				win.insert(win.items.indexOf(progressBar), {
					tpl: 'Created {n} combo boxes'
					,data: {n: n}
				});

				progressBar.destroy();

				Ext.callback(callback, scope, [items]);
			}
		}

		Ext.Function.defer(next, 1);
	}
});
