const fs = require('fs');
const http = require('http');
const html = fs.readFileSync('./view/home.html', 'utf-8');
//creat srever 

function replaceHtml(template, product){
    let output = template.replace('{{%IMAGE%}}', product.productImage);
    output = output.replace('{{%NAME%}}', product.name);
    output = output.replace('{{%MODELNAME%}}', product.modeName);
    output = output.replace('{{%MODELNO%}}', product.modelNumber);
    output = output.replace('{{%SIZE%}}', product.size);
    output = output.replace('{{%CAMERA%}}', product.camera);
    output = output.replace('{{%PRICE%}}', product.price);
    output = output.replace('{{%COLOR%}}', product.color);
    output = output.replace('{{%ID%}}', product.id);
    output = output.replace('{{%ROM%}}', product.ROM);
    output = output.replace('{{%DESC%}}', product.Description);

    return output;
}
//STEP 1: CREATE A SERVER
const server = http.createServer((request, response) => {
    //console.log(x);
    let path = request.url;
    
    /*if(path === '/' || path.toLocaleLowerCase() ==='/home'){
        response.writeHead(200, {
            'Content-Type' : 'text/html',
            'my-header': 'Hellow, world'
        });
        response.end(html.replace('{{%CONTENT%}}', 'You are in Home page'));
    } else if(path.toLocaleLowerCase() === '/about'){
        response.writeHead(200, {
            'Content-Type' : 'text/html',
            'my-header': 'Hellow, world'
        });
        response.end(html.replace('{{%CONTENT%}}', 'You are in About page'));
    } else if(path.toLocaleLowerCase() === '/contact'){
        response.writeHead(200, {
            'Content-Type' : 'text/html',
            'my-header': 'Hellow, world'
        });
        response.end(html.replace('{{%CONTENT%}}', 'You are in Contact page'));
    } else if(path.toLocaleLowerCase() === '/products'){
        if(!query.id){
            let productHtmlArray = products.map((prod) => {
                return replaceHtml(productListHtml, prod);
            })
            let productResponseHtml = html.replace('{{%CONTENT%}}', productHtmlArray.join(','));
            response.writeHead(200, {'Content-Type': 'text/html' });
            response.end(productResponseHtml);
        } else {
            let prod = products[query.id]
            let productDetailResponseHtml = replaceHtml(productDetailHtml, prod);
            response.end(html.replace('{{%CONTENT%}}', productDetailResponseHtml));
        }
    } else {
        response.writeHead(404, {
            'Content-Type' : 'text/html',
            'my-header': 'Hellow, world'
        });
        
    }*/
    response.end(html);
});


//start server
server.listen(8000,'127.0.0.1',() =>{
    console.log('server started');
});