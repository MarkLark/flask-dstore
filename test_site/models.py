from dstore import Model, var, mod

__all__ = [ "Car", "models" ]


class Car( Model ):
    _namespace = "cars.make"
    _vars = [
        var.RowID,
        var.String( "manufacturer", 32, mods = [ mod.NotNull() ] ),
        var.String( "make", 32, mods = [ mod.NotNull() ] ),
        var.Number( "year", mods = [ mod.NotNull(), mod.Min( 1950 ), mod.Max( 2017 ) ] ),
    ]
    _acl_rules = dict(
        add    = dict( allow = [ "admin", "member" ]),
        read   = dict( default = True ),
        update = dict( allow = [ "admin" ]),
        delete = dict( allow = [ "admin" ]),
        empty  = dict( allow = [ "admin" ])
    )

models = [ Car ]
