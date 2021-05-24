
enum OrderStatus    {
    // 1-3: still can be updated or cancel ~ ' ': order created, 1: order verified by Sphinx admin, 2: order confirmed, 3. order processed up by factory
        // 4 onward cannot be changed ~ 4: material indent, 5: furniture building in progress
        // 6: ready to ship , 7: at hand of shipper, 8: clear custom, 9: order received by customer, C: order completed
        // R: order returned, X: order cancelled
    ORDER_CREATED       = ' ',
    ORDER_VERIFIED      = '1',
    ORDER_CONFIRMED     = '2',
    ORDER_TO_MANUFACTURER   = '3',
    MATERIAL_INDENT     = '4',
    BUILD_IN_PROGRESS   = '5',
    READY_TO_SHIP       = '6',
    COURIER_PICKED_UP   = '7',
    CUSTOM_CLEARANCE    = '8',
    CUSTOMER_RECEIPT    = '9',
    ORDER_COMPLETED     = 'C',
    ORDER_RETURNED      = 'R',
    ORDER_CANCELLED     = 'X'

}

enum Status {
    DECLINED = "DECLINED",
    REJECTED = "REJECTED",
    ACCEPTED = "ACCEPTED",
    APPROVED = "APPROVED",
    PENDING  = "PENDING"
}
