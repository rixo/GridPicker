GridPicker
==========

Compatible with: *`ExtJS 4.2.0`*


The `GridPicker` component is an extended combo box that replaces the default list view with a full fledged `GridPanel`. That allows to achieve advanced formatting without having to manipulate HTML and let you implement custom list behaviors with regular Ext widgets like toolbars, buttons, etc.

Among the extra possibilities that the grid panel offers, a notable one is the support of [buffered rendering][1]. Thanks to this, rendering huge data sets in buffered grid is actually very much faster than with standard combo boxes! Unfortunately, this component does not support [buffered store][2]; buffered rendering works with whole data set loaded in memory.

I've committed myself to make **key navigation** work properly. But multiselect is not supported. And the code has been tested working with Ext4.2.0 only. I know Ext4.2.1 introduces breaking changes...

I've developed this for my own needs, and I'm sharing because I've seen during my researches that others were working on it, or needing it. For now at least, I don't really plan on developing this much further. But I'll do my best to fix bugs that are brought to my attention. And there is room for them, since I have thoroughly tested only the use cases that interested me.


Demo
---

The examples are available [online][5].


Usage
---

The main difference with the regular [`ComboBox`][3] is that the `listConfig` and  `defaultListConfig` options are replaced with `gridConfig` and `defaultGridConfig`. These, of course, expects the configuration of the [`GridPanel`][4].

You're not supposed to work directly with `defaultListConfig`, although you may want to override it application wide. It provides a sensible default configuration, so that you've only left with the minimal amount of work to do.

The only required config option for a working `GridPicker` is `store`. Like with regular combo, you can provide a single dimension array (e.g. `['Foo', 'Bar']`) that will be converted to an implicit store.

You can configure the grid columns anyway you want, but you don't have to. If you don't provide `columns` configuration, the component will generate a default one, displaying the configured `displayField`.

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
  [5]: http://planysphere.fr/ext/GridPicker/examples
