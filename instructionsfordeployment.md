git clone git@github.com:cs205-sp-26/lab-8-dj.git
cd lab-8-dj

npm install
npm start


in package.js
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "node server.js"
}

IN server.js
const PORT = process.env.PORT || 3000;
app.listen(PORT);


git remote -v
git remote remove origin


git remote add origin git@github.com:jorgeSilveyra/lab-8-deployment-demo.git


git add .
git commit -m "Prepare for deployment"
git push -u origin main --force


render.com
select web app
Change to npm start
