/**
 * Copyright (C) 2013 Eoko
 *
 * This file is part of Opence.
 *
 * Opence is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Opence is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Opence. If not, see <http://www.gnu.org/licenses/gpl.txt>.
 *
 * @copyright Copyright (C) 2013 Eoko
 * @licence http://www.gnu.org/licenses/gpl.txt GPLv3
 * @author Éric Ortega <eric@eoko.fr>
 */

/**
 *
 * @since 2013-06-23 23:52
 */
Ext.define('GridPickerDemo.controller.Performance', {
	extend: 'Ext.app.Controller'

	,refs: [{
		ref: 'combos'
		,selector: 'combo'
	},{
		ref: 'timeOutput'
		,selector: '#timeOutput'
	},{
		ref: 'dataOutput'
		,selector: '#dataOutput'
	},{
		ref: 'formPanel'
		,selector: 'form'
	}]

	,init: function() {
		this.control({
			'pickerfield': {
				afterrender: function(field) {
					field.addPlugin(Ext.create(this.BeforeExpandPlugin));
				}

				,beforeexpand: function(field) {
					var date = new Date,
						picker = field.getPicker(),
						view = picker.getView && picker.getView() || picker;

					view.beforeExpandDate = date;
					view.freezeTimeOutput = this.getApplication().getOuputWindow().add({
						tpl: field.getFieldLabel() + " freeze time: {time:number} ms"
						,html: '&nbsp;'
					});

				}
				,expand: function(field) {
					var picker = field.getPicker(),
						view = picker.getView && picker.getView() || picker;
					this.onExpandViewRefreshed(view);
				}

				,select: function() {
					var form = this.getFormPanel();
					this.getDataOutput().update({
						out: JSON.stringify(form.form.getValues(), 0, 4)
					});
				}
			}

			,gridview: {
				refresh: this.onExpandViewRefreshed
			}
			,boundlist: {
				refresh: this.onExpandViewRefreshed
			}
		});
	}

	,BeforeExpandPlugin: Ext.define(null, {

		init: function(combo) {
			combo.addEvents('beforeexpand');

			combo.expand = Ext.Function.createInterceptor(
				combo.expand,
				this.onBeforeExpand
			);
		}

		,onBeforeExpand: function() {
			return this.fireEvent('beforeexpand', this);
		}
	})

,onExpandViewRefreshed: function(view) {
		var now = new Date,
			time = now - view.beforeExpandDate,
			output = view.freezeTimeOutput;
		output.update({time: time});
	}

});
