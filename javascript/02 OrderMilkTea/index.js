const orderForm = document.querySelector("#order-form")

function getOrderSummary(formInput) {
    return `
    【您的订单生成结果如下】
        ---------------------------------------
        奶茶口味：${formInput.type}
        数量：${formInput.num}
        杯型：${formInput.size}
        甜度：${formInput.sugar}
        免费小料：${formInput["snack-free"] ? formInput["snack-free"] : "-"}
        付费小料：${formInput["snack"] ? formInput["snack"] : "-"}
        是否加冰：${formInput.ice}
        是否去茶底：${formInput["remove-tea"]}
        配送地址：${formInput.address}
        手机号：${formInput.phone}
        期待送达时间：${formInput.time}
        备注：${formInput.comment}
        支付方式：${formInput["pay-type"]}
        ---------------------------------------
    `
}

const onSubmit = (e) => {
    // 阻止刷新
    e.preventDefault()
    const formData = new FormData(orderForm);
    const formInput = {}
    for (const pair of formData.entries()) {
        const name = pair[0]
        const val = pair[1]
        // 拼接多个选项
        if (formInput[name]) {
            formInput[name] = [val].concat(formInput[name])
        } else {
            formInput[name] = val
        }
    }
    console.log(formInput)
    alert(getOrderSummary(formInput))
}
orderForm.addEventListener("submit", onSubmit);


const scrollToTopBtn = document.querySelector(".scroll-to-top")
scrollToTopBtn.addEventListener("click", () => {
    document.scrollingElement.scrollTop = 0
})