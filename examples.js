/**
 * @licence http://www.gnu.org/licenses/gpl.txt GPLv3
 * @author Éric Ortega <eric@plnaysphere.fr>
 */
Ext.Loader.setConfig({
	disableCaching: false
	,enabled: true
	,paths: {
		'Ext.ux': 'ux'
	}
});

Ext.require('Ext.ux.Rixo.form.field.GridPicker');

Ext.onReady(function() {

	// --- Example 1: Buffered Grid ------------------------------------------------------------------------------------

	var data = [],
		i;

	for (i=1; i<=50000; i++) {
		data.push("Record #" + i);
	}

	Ext.widget('gridpicker', {
		renderTo: 'example1'

		,gridConfig: {
			// maxHeight for maximum effect (and also for -- kinda -- working around the combo's list
			// positionning bug)
			maxHeight: 300
			,plugins: {
				ptype: 'bufferedrenderer'
			}
		}

		,store: data

		,listeners: {
			select: function(combo, records) {
				Ext.Msg.alert("Record Selected", records[0].get('field1'));
			}
		}
	});

	// --- Example 2: Simple Grid --------------------------------------------------------------------------------------

	Ext.widget('gridpicker', {
		renderTo: 'example2'
		,store: ['Foo', 'Bar', 'Baz']
	});

	// --- Example 3: Grid Features ------------------------------------------------------------------------------------

	data = [];
	['Foo', 'Bar', 'Baz'].forEach(function(group) {
		for (var i=1; i<=5; i++) {
			data.push([group + ' #' + i, group]);
		}
	});

	Ext.widget('gridpicker', {
		renderTo: 'example3'

		,queryMode: 'local'
		,typeAhead: true

		,store: {
			fields: ['name', 'group']
			,proxy: {
				type: 'memory'
				,reader: 'array'
			}
			,data: data
			,groupField: 'group'
			,sorters: {
				property: 'name', order: 'ASC'
			}
		}

		,displayField: 'name'

		,gridConfig: {
			features: [{
				ftype:'grouping'
				,groupHeaderTpl: '{name}'
				,collapsible: false
			}]

			,columns: [{
				xtype: 'rownumberer'
			},{
				dataIndex: 'name'
				,flex: 1
			},{
				width: 30
				,renderer: function(value, md, record, i) {
					return '<img src="' + [
						'http://upload.wikimedia.org/wikipedia/commons/b/b2/Happy_icon-16x16.gif',
						'http://upload.wikimedia.org/wikipedia/commons/b/b1/Gnome-emblem-web-16x16.png',
						'http://upload.wikimedia.org/wikipedia/commons/9/90/U_2A568_16x16.gif'
					][i % 3] + '" />';
				}
			}]

			,tbar: {
				defaults: {
					enableToggle: true
					,pressed: true
				}
				,items: [{
					text: "Foo"
				},{
					text: "Bar"
				},{
					text: "Baz"
				}]
			}

			// Filtering logic
			,listeners: {
				single: true
				,afterrender: function() {
					var grid = this,
						store = this.getStore(),
						filters = {};
					grid.query('button').forEach(function(button) {
						button.on('toggle', function(button, pressed) {
							filters[button.text] = pressed;
							store.filter(function(record) {
								return filters[record.get('name').substr(0, 3)] !== false;
							});
							grid.doLayout(); // update grid height
						})
					});
				}
			}
		}
	});

});
