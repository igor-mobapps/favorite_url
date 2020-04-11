const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')


async function load() {
    const res = await fetch("http://localhost:3000/").then((data) => data.json())
    res.urls.map((res) => addElement(res))
}

async function createUrl(name, url) {
    await fetch(`http://localhost:3000/?name=${name}&url=${url}`).then(() => console.log('Success!!'));
}

async function deleteUrl(name, url) {
    await fetch(`http://localhost:3000/?name=${name}&url=${url}&del=1`).then(()=> console.log('Deleted'));
}

load()


function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.setAttribute('data-name', name);
    trash.setAttribute('data-url', url);
    trash.onclick = () => removeElement(trash)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(el) {
    if (confirm('Tem certeza que deseja deletar?'))
        el.parentNode.remove()
    
    let name = el.getAttribute('data-name');
    let url  = el.getAttribute('data-url');
    deleteUrl(name, url)
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    createUrl(name, url);
    addElement({ name, url })

    input.value = ""
})