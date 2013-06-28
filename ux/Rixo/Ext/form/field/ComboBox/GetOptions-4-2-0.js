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
 * Adds the {@link #getOptions} method to {@link Ext.form.field.ComboBox}.
 *
 * @since 2013-06-20 00:39
 */
Ext.define('Ext.ux.Rixo.Ext.form.field.ComboBox.GetOptions-4-2-0', {
	override: 'Ext.form.field.ComboBox'

	,getLoadOptions: function(queryString) {
		return {
			params: this.getParams(queryString)
		};
	}

	/**
	 * @inheritdoc
	 * Overridden in order to implement {@link getLoadOptions}.
	 */
	,loadPage: function(pageNum){
		this.store.loadPage(pageNum, this.getLoadOptions());
	}

	/**
	 * @inheritdoc
	 * Overridden in order to implement {@link getLoadOptions}.
	 */
	,doQuery: function(queryString, forceAll, rawQuery) {
		queryString = queryString || '';

		// store in object and pass by reference in 'beforequery'
		// so that client code can modify values.
		var me = this,
			qe = {
				query: queryString,
				forceAll: forceAll,
				combo: me,
				cancel: false
			},
			store = me.store,
			isLocalMode = me.queryMode === 'local';

		if (me.fireEvent('beforequery', qe) === false || qe.cancel) {
			return false;
		}

		// get back out possibly modified values
		queryString = qe.query;
		forceAll = qe.forceAll;

		// query permitted to run
		if (forceAll || (queryString.length >= me.minChars)) {
			// expand before starting query so LoadMask can position itself correctly
			me.expand();

			// make sure they aren't querying the same thing
			if (!me.queryCaching || me.lastQuery !== queryString) {
				me.lastQuery = queryString;

				if (isLocalMode) {

					// Querying by a typed string...
					if (queryString || !forceAll) {

						// Ensure queryFilter is enabled and set the new value
						me.queryFilter.disabled = false;
						me.queryFilter.setValue(me.enableRegEx ? new RegExp(queryString) : queryString);
					}

					// Disable query value filter if no query string or forceAll passed
					else {
						me.queryFilter.disabled = true;
					}

					// Filter the Store according to the updated filter
					store.filter();
				} else {
					// Set flag for onLoad handling to know how the Store was loaded
					me.rawQuery = rawQuery;

					// In queryMode: 'remote', we assume Store filters are added by the developer as remote filters,
					// and these are automatically passed as params with every load call, so we do *not* call clearFilter.
					if (me.pageSize) {
						// if we're paging, we've changed the query so start at page 1.
						me.loadPage(1);
					} else {
						store.load(this.getLoadOptions(queryString));
					}
				}
			}

			// Clear current selection if it does not match the current value in the field
			if (me.getRawValue() !== me.getDisplayValue()) {
				me.ignoreSelection++;
				me.picker.getSelectionModel().deselectAll();
				me.ignoreSelection--;
			}

			if (isLocalMode) {
				me.doAutoSelect();
			}
			if (me.typeAhead) {
				me.doTypeAhead();
			}
		}
		return true;
	}
});
