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
 * @todo Upgrade for Ext4.2.1
 *
 * @since 2013-06-20 00:39
 */
Ext.define('Ext.ux.Rixo.Ext.form.field.ComboBox.GetOptions', function() {
	var v = Ext.getVersion().isLessThan('4.2.1') ? '4-2-0' : '4-2-1';
	return {
		requires: [
			'Ext.ux.Rixo.Ext.form.field.ComboBox.GetOptions-' + v
		]
	};
});
