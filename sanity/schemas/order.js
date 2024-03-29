export default {
    name: 'order',
    title: 'order',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            options: {
                maxLength: 40
            }
        },
        {
            name: 'phone',
            title: 'Phone',
            type: 'string',
            options: {
                maxLength: 15
            }
        },
        {
            name: 'address',
            title: 'Address',
            type: 'string',
            options: {
                maxLength: 100
            }
        },
        {
            name: 'total',
            title: 'Total',
            type: 'number',
        },
        
        {
            name: 'status',
            title: 'Status',
            type: 'number',
        },

        {
            name: 'method',
            title: "Method",
            type: "number"
        },
        

        
    ],
    
}