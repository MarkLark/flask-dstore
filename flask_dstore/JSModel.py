from dstore import var


class JSModel( object ):
    def __init__( self, model ):
        self.model = model

    def __str__( self ):
        # Perform ACL checks to see what methods to include
        # if not self.model._expose_api: return ""
        return """
DS.Factory.new({
    namespace: "%s",
    vars: [
%s
    ]
});
""" % ( self.model._namespace, self.vars() )

    def vars( self ):
        rtn = ""
        for col in self.model._vars:
            rtn += "        " + self.var_instance( col )
        return rtn[ :-2 ]

    def var_instance( self, col ):
        if isinstance( col, var.Number ):
            return 'DS.Vars.Number.new({ name: "%s" }),\n' % col.name
        elif isinstance( col, var.Boolean ):
            return 'DS.Vars.Boolean.new({ name: "%s" }),\n' % col.name
        elif isinstance( col, var.Character ):
            return 'DS.Vars.Character.new({ name: "%s" }),\n' % col.name
        elif isinstance( col, var.Binary ):
            return 'DS.Vars.Binary.new({ name: "%s" }),\n' % col.name
        elif isinstance( col, var.String ):
            return 'DS.Vars.String.new({ name: "%s" }),\n' % col.name
        elif isinstance( col, var.Text ):
            return 'DS.Vars.Text.new({ name: "%s" }),\n' % col.name
        elif isinstance( col, var.Float ):
            return 'DS.Vars.Float.new({ name: "%s" }),\n' % col.name
        elif isinstance( col, var.Enum ):
            return 'DS.Vars.Enum.new({ name: "%s", values: ["%s"] }),\n' % ( col.name, ", " .join( col.values ) )
        elif isinstance( col, var.ForeignKey ):
            return 'DS.Vars.ForeignKey.new({ name: "%s" }),\n' % col.name
        elif isinstance( col, var.Date ):
            return 'DS.Vars.Date.new({ name: "%s" }),\n' % col.name
        elif isinstance( col, var.Time ):
            return 'DS.Vars.Time.new({ name: "%s" }),\n' % col.name
        elif isinstance( col, var.DateTime ):
            return 'DS.Vars.DateTime.new({ name: "%s" }),\n' % col.name
        elif col == var.RowID:
            return "DS.Vars.RowID.new(),\n"
        return ""
