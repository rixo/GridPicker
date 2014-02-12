/**
 * Polyfill for Array.prototype.forEach.
 *
 * @author Éric Ortega <eric@planysphere.fr>
 * @since 2014-02-12 18:35
 */
Ext.define('Ext.ux.Rixo.polyfill.ForEach', function() {
	if (!Array.prototype.forEach) {
		Array.prototype.forEach = function(fn, scope) {
			for (var i=0, len=this.length; i<len; i++) {
				fn.call(scope || this, this[i]);
			}
		}
	}
	return {};
});
