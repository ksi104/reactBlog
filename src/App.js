import React, {useState} from "react";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './App.css';


function Header(props) {
  //console.log(props);
  return (
    <header>
      <h1><a href='/'onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  )
}
function Nav(props) {
  const lis=[];
  for(let i=0; i<props.topics.length; i++) {
    let t=props.topics[i];
    lis.push(<li key={t.id}><a id={t.id} href={'/read/'+t.id} onClick={event=>{
      event.preventDefault();
      props.onChangeMode(event.target.id, i);
    }}>{t.title}</a></li>)
  }
  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}
function Article(props){
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={event=>{
        event.preventDefault();
        const title=event.target.title.value;
        const body=event.target.body.value;
        props.onCreate(title, body);
      }}>
        <p><input type="text" name="title" placeholder="title" /></p>
        <p><textarea name='body' placeholder="body"></textarea></p>
        <p><input type='submit' value='Create' /></p>
      </form>
    </article>
  )
}

function Update(props) {
  const [title,setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={event=>{
        event.preventDefault();
        const title=event.target.title.value;
        const body=event.target.body.value;
        props.onUpdate(title, body);
      }}>
        <p><input type="text" name="title" placeholder="title" value={title} onChange={event=>{
          setTitle(event.target.value);
        }} /></p>
        <p><textarea name='body' placeholder="body" value={body} onChange={event=>{
          setBody(event.target.value);
        }} /></p>
        <p><input type='submit' value='Update' /></p>
      </form>
    </article>
  )
}


function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] =useState(null);
  const [nextId, setNextId] = useState(4);
  const [idx, setIdx] = useState(null);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'}
  ]);

  let content=null;
  let btn_update = null;
  let btn_delete = null;
  if(mode === 'WELCOME') {
    content = <Article title='WELCOME' body="Hello, WEB" />
  }else if(mode==='READ') {
    if(id!==null) {
      let title, body = null;
      title=topics[idx].title;
      body=topics[idx].body
      content = <Article title={title} body={body} />
    }else {
      content = <Article title='Read' body="Hello, Read" />
    }
    btn_update=<li><a href={'/update/'+id} onClick={event=>{
      event.preventDefault();
      setMode('UPDATE');
    }}>Update</a></li>

    btn_delete=<li><a href={'/delete/'+id} onClick={event=>{
      event.preventDefault();
      confirmAlert({
        title : 'Confirm to Delete',
        message : 'Are you sure to do this?',
        buttons:[
          {
            label:'Yes',
            onClick:()=>{ setMode('DELETE'); }
          },
          {
            label: 'No',
            onClick:()=>{ console.log('cancel'); }
          }
        ]
      });
    }}>Delete</a></li>

  }else if(mode==='CREATE') {
    content=<Create onCreate={(_title, _body) => {
      const newTopic = { id:nextId, title : _title, body : _body}
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setIdx(newTopics.length - 1);
      setNextId(nextId + 1);
    }} />
  }else if(mode==="UPDATE") {
    let title, body = null;
    title = topics[idx].title;
    body = topics[idx].body;

    content=<Update title={title} body={body} onUpdate={(title, body) => {
      const newTopics = [...topics];
      newTopics[idx].title = title;
      newTopics[idx].body = body;
      setTopics(newTopics);
      setMode('READ');
    }}/>
  }else if(mode==="DELETE") {
    const newTopics = [...topics];
    
    newTopics.splice(idx,1);
    console.log(idx, topics, newTopics);
    setTopics(newTopics);
    setMode('WELCOME');
    setNextId(nextId - 1);
    console.log(idx);

  }

  return (
    <div>
      <Header title="WEB" data-seq='1' onChangeMode={()=>{
        setMode('WELCOME');
        setId(null);
      }}/>
      <Nav topics={topics} onChangeMode={(_id, _idx)=>{
        setMode('READ');
        setId(_id);
        setIdx(_idx);
      }}/>
      {content}
      <ul>
        <li><a href="/create" onClick={event=>{
        event.preventDefault();
          setMode('CREATE')
        }}>Create</a></li>
        {btn_update}
        {btn_delete}
      </ul>
    </div>
  )
}

export default App;