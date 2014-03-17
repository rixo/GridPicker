/**
 * GridPicker implementation part that is specific to Ext 4.2.0.
 *
 * @author Éric Ortega <eric@planysphere.fr>
 * @since 2014-02-12 21:30
 */
Ext.define('Ext.ux.Rixo.form.field.GridPicker-4-2-0', {
	override: 'Ext.ux.Rixo.form.field.GridPicker'

	/**
	 * Gets the option to load the store with the specified query.
	 *
	 * @param {String} queryString
	 * @return {String}
	 * @protected
	 */
	,getLoadOptions: function(queryString) {
		var filter = this.queryFilter;
		if (filter) {
			filter.disabled = false;
			filter.setValue(this.enableRegEx ? new RegExp(queryString) : queryString);
			return {
				filters: [filter]
			};
		}
	}

	/**
	 * @inheritdoc
	 * Overridden in order to implement {@link #getLoadOptions}.
	 */
	,loadPage: function(pageNum){
		this.store.loadPage(pageNum, this.getLoadOptions());
	}

	/**
	 * @inheritdoc
	 * Overridden in order to implement {@link #getLoadOptions}.
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
					if (me.queryFilter) {
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
					}
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
