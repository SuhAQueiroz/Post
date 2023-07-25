import { Post } from "./components/Post";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import './global.css';
import styles from './App.module.css'

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/SuhAQueiroz.png",
      name: "Suzy Queiroz",
      role: "Developer"
    },
    content:[
      {type: "paragraph", content: "Fala galeraa 👋"},
      {type: "paragraph", content: "Desenvolvi esse projeto em React com Typescript, usando conceitos de Iteração, propriedades do componente, estado, key, comunicação entre componentes, validação de formulários, imutabilidade.🚀"},
      {type: "link", content: "👉jane.design/doctorcare"}
    ],
    publishedAt: new Date('2023-07-08 19:00:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/SuhAQueiroz.png",
      name: "Suzy Queiroz",
      role: "Developer"
    },
    content:[
      {type: "paragraph", content: "Fala galeraa 👋"},
      {type: "paragraph", content: "É um projeto simples, mas que me garantiu mais conhecimento. foco!!! 🚀"},
      {type: "link", content: "👉jane.design/doctorcare"}
    ],
    publishedAt: new Date('2023-07-08 19:20:00')
  },
]

export function App() {
  
  return (
    <div>
     <Header/>
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post=>{
            return(
              <Post
              key={post.id}
              author= {post.author}
              content={post.content}
              publishedAt={post.publishedAt}
              />
            )
          })}
        </main> 
      </div>
    </div>
  );
}
