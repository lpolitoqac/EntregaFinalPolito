
async function obtenerJson() {
    try {
        const resp = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await resp.json()
        data.forEach((post) => {
            const div = document.createElement('div')
            div.innerHTML = `
            
            <p class="textosdoc">${post.title}</p>
            <p class="textosdoc">${post.body}</p>
        `
            document.body.append(div)
        })
    } catch (error) {
        alert(error)
    }

}
obtenerJson()
