
car_table = DS.View.List.new({
    name: "view-car-table",
    model: ds.cars.make,
    template: DS.View.Template.new(
        `{% include "car/table/car_table_row.html" %}`,
        {
            manufacturer: "",
            make: "",
            year: ""
        }
    ),
    dom: {
        parent: { id: "tbl-cars" },
        data: { id: "tbody" }
    },
})
