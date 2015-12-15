GridPicker
==========

Compatible with: *`ExtJS 4.2.0`* *`ExtJS 4.2.1`*


The `GridPicker` component is an extended combo box that replaces the default list view with a full fledged `GridPanel`.

Among the extra possibilities that the grid panel offers, a notable one is the support of [buffered rendering][1]. Thanks to this, rendering huge data sets in buffered grid is actually very much faster than with standard combo boxes! Unfortunately, this component does not support [buffered store][2]; buffered rendering works with whole data set loaded in memory.

I've committed myself to make **key navigation** work properly. But multiselect is not supported.

**Update 2014-07-31**

Thanks to feedback from users, the `GridPicker` should now work with Ext 4.2.1 too.


Demo
---

The examples are available [online][5].


Usage
---

The main difference with the regular [`ComboBox`][3] is that the [`listConfig`][7] and  [`defaultListConfig`][6] options are replaced with `gridConfig` and `defaultGridConfig`. These, of course, expects the configuration of the [`GridPanel`][4].

The only required config option for a working `GridPicker` is `store`. Like with regular combo, you can provide a single dimension array (e.g. `['Foo', 'Bar']`) that will be converted to an implicit store.

You can configure the grid columns anyway you want, but you don't have to. If you don't provide `columns` configuration, the component will generate a default one, displaying the configured [`displayField`][8].

Apart from that, most of [standard combo options][3] should be supported. If you find some that don't work (and are not documented here), let me know!

Here are some that I have tested and should work for sure:

- displayField
- forceSelection
- queryDelay
- queryModel
- queryParam
- store
- typeAhead
- valueField

And here are those which, for sure, don't work:

- multiselect


Licence
---
Licenced under GPLv2


  [1]: http://docs.sencha.com/extjs/4.2.0/#!/api/Ext.grid.plugin.BufferedRenderer
  [2]: http://docs.sencha.com/extjs/4.2.0/#!/api/Ext.data.Store-cfg-buffered
  [3]: http://docs.sencha.com/extjs/4.2.0/#
  [4]: http://docs.sencha.com/extjs/4.2.0/#!/api/Ext.grid.Panel
  [5]: http://rixo.github.io/GridPicker/
  [6]: http://docs.sencha.com/extjs/4.2.0/#!/api/Ext.form.field.ComboBox-cfg-defaultListConfig
  [7]: http://docs.sencha.com/extjs/4.2.0/#!/api/Ext.form.field.ComboBox-cfg-listConfig
  [8]: http://docs.sencha.com/extjs/4.2.0/#!/api/Ext.form.field.ComboBox-cfg-displayField
  
