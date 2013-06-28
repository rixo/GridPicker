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
 * Key navigation for {@link Ext.ux.Rixo.form.field.GridPicker}.
 *
 * @since 2013-06-20 16:07
 */
Ext.define('Ext.ux.Rixo.form.field.GridPickerKeyNav', {
	extend: 'Ext.util.KeyNav'

	,constructor: function(config) {
		this.pickerField = config.pickerField;
		this.grid = config.grid;
		this.callParent([config.target, Ext.apply({}, config, this.defaultHandlers)]);
	}

	,defaultHandlers: {
		up: function() {
			this.goUp(1);
		}

		,down: function() {
			this.goDown(1);
		}

		,pageUp: function() {
			this.goUp(10);
		}

		,pageDown: function() {
			this.goDown(10);
		}

		,home: function() {
			this.highlightAt(0);
		}

		,end: function() {
			var count = this.getGrid().getStore().getCount();
			if (count > 0) {
				this.highlightAt(count - 1);
			}
		}

		,tab: function(e) {
			var pickerField = this.getPickerField();
			if (pickerField.selectOnTab) {
				this.selectHighlighted(e);
				pickerField.triggerBlur();
			}
			// Tab key event is allowed to propagate to field
			return true;
		}

		,enter: function(e) {
			this.selectHighlighted(e);
		}
	}

	,goUp: function(n) {
		var grid = this.getGrid(),
			store = grid.getStore(),
			sm = grid.getSelectionModel(),
			lastSelected = sm.lastSelected,
			count = store.getCount(),
			nextIndex = count - n;

		if (count > 0) {
			if (lastSelected) {
				nextIndex = store.indexOf(lastSelected) - n;
				if (nextIndex < 0) {
					nextIndex = count - 1;
				}
			}

			this.highlightAt(nextIndex);
		}
	}

	,goDown: function(n) {
		var grid = this.getGrid(),
			store = grid.getStore(),
			sm = grid.getSelectionModel(),
			lastSelected = sm.lastSelected,
			count = store.getCount(),
			nextIndex = 0;

		if (count > 0) {
			if (lastSelected) {
				nextIndex = store.indexOf(lastSelected) + n;
				if (nextIndex >= count) {
					nextIndex = 0;
				}
			}

			this.highlightAt(nextIndex);
		}
	}

	,getPickerField: function() {
		return this.pickerField;
	}

	,getGrid: function() {
		return this.grid;
	}

	,highlightAt: function(index) {
		this.getPickerField().highlightAt(index);
	}

	,selectHighlighted: function(e) {
		var selection = this.getGrid().getSelectionModel().getSelection(),
			selected = selection && selection[0],
			pickerField = this.pickerField;
		if (selected) {
			pickerField.setValue(selected.get(pickerField.valueField))
		}
	}
});
