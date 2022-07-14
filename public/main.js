const addToCartBtn = document.getElementById('addToCartBtn')

if (addToCartBtn) {
    addToCartBtn.addEventListener('click', async e => {
        e.stopPropagation()
        e.preventDefault()
        const url = e.target.href
        const res = await fetch(url)
        const result = await res.json()
        if (result) window.location.href = "/cart";
    })
}


M.Tabs.init(document.querySelectorAll('.tabs'));