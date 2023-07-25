import { Button } from '@mantine/core';
import styles from './Post.module.css';
import { Comment } from './Comment';
import { Avatar } from './Avatar';
import {format, formatDistanceToNow} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';


interface Author{
    name: string,
    role: string,
    avatarUrl: string
}

interface Content{
    type: 'paragraph'|'link',
    content: string
}

interface PostProps{
    author: Author,
    publishedAt: Date, 
    content: Content[]
}

export function Post({author, publishedAt, content}:PostProps) {
 
    let publishedDateFormatted = "";
    let publishedDateRelativeToNow = "";

    if (publishedAt) {
        publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
            locale: ptBR,
        });
    
        publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
            locale: ptBR,
            addSuffix: true,
        });
    }
    const [coments,setComents] = useState(["Muito bacana, hein? 👏👏"])

    const [newComment, setNewComment] = useState('')

    function handleCreateComent(event: FormEvent){
        // const newComment = event.target.comment.value; Ao inves disse faço o State e o evento onChange
        event.preventDefault()
        setComents([...coments, newComment])
        // event.target.comment.value=''   
        setNewComment('')
    }
    function handleComentChange(event:ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('') //Para corrigir erro do campo
        setNewComment(event.target.value)
    }
    function deleteComment(commentToDelete:string){
        const commentsWithoutDeletOne = coments.filter(comment=>{
            return comment !== commentToDelete;  
        })
        setComents(commentsWithoutDeletOne);  
    }
   
    function handleNewCommentInvalid(event:InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório')

    }
    const isNewCommentEmpty = newComment.length === 0;
    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl}/>
                    <div className={styles.authorInfo} >
                        <strong>
                            {author.name}
                        </strong>
                        <span>
                            {author.role}
                        </span>
                    </div>
                </div>
                <time title={publishedDateFormatted} dateTime={publishedAt?.toISOString()}>
                {publishedDateRelativeToNow}
                </time>
            </header>
            <div className={styles.content}>
            {Array.isArray(content) &&
                content.map((line) => {
                if (line.type === 'paragraph') {
                    return <p key={line.content}>{line.content}</p>;
                } else if (line.type === 'link') {
                    return (
                    <p key={line.content}>
                        <a href="#">{line.content}</a>
                    </p>
                    );
                }
                return null;
                })}
            </div> 
            <form onSubmit={handleCreateComent} className={styles.comentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea className={styles.teste}
                placeholder="Deixe um comentário"
                // name={comment}
                onChange={handleComentChange} 
                value={newComment}
                onInvalid={handleNewCommentInvalid}
                required
                />
                <footer>
                    <Button disabled={isNewCommentEmpty} type="submit">Publicar</Button>
                </footer>
            </form>
            <div className={styles.commentList}>
              {coments.map(coment=>{
                return <Comment key={coment} content= {coment} onDeleteComment={deleteComment}/>
              })}
            </div>
        </article>
    )
}

  