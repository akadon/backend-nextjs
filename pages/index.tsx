/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from "axios";
import {useQuery,useQueryClient} from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { useCookies  } from "react-cookie";
import { useForm } from "react-hook-form";
import { json } from 'stream/consumers';

const endpoint = "http://localhost:3000/api/graphql";

function usePosts() {
  return useQuery(["posts"], async () => {
    const data= await request(
      endpoint,
      gql`
        query{
          getposts {
            id
            title
          }
        }
      `
    );
    return data.getposts;
  });
}

function usePost(postId:any) {
  return useQuery(["post", postId],async () => {
      const post  = await request(
        endpoint,
        gql`
          query {
            getpost(id: ${postId}) {
              id
              title
              body
            }
          }
        `
      );
      return post.getpost;
    },{enabled: !!postId,});
}

function Posts({ setPostId }:any) {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching }:any = usePosts();

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {status === "loading" ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error: </span>
        ) : (
          <>
            <div>
              {data.map((post:any) => (
                <p key={post.id}>
                  <a onClick={() => setPostId(post.id)}
                    href="#"
                    style={queryClient.getQueryData(["post", post.id])? { fontWeight: "bold",color: "green",}: {}}>
                    {post.title}
                  </a>
                </p>
              ))}
            </div>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
      </div>
    </div>
  );
}

function Post({ postId, setPostId }:any) {
  const { status, data, error, isFetching }:any = usePost(postId);

  return (
    <div>
      <div>
        <a onClick={() => setPostId(-1)} href="#">
          Back
        </a>
      </div>
      {!postId || status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <h1>{data.title}</h1>
          <div>
            <p>{data.body}</p>
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
  );
}

const Home = () => {
  const [postId, setPostId] = useState(-1);
  const [cookies, setCookie] = useCookies(["jwt"]);

  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {if (typeof window !== "undefined") {setHasWindow(true);}}, []);

  // useEffect(() => {    
  //   axios.get(`http://localhost:3000/api/sign`)
  //   .then((out:any) => {setCookie("jwt", out.data, { path: '/' })})
  //  },[]);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async (data:any) => await axios({
    url: "http://localhost:3000/api/sign",
    method: 'post',
    headers: {
      "content-type": "application/json"
    },
    data
  }).then((out:any) => {setCookie("jwt", out.data, { path: '/' })})

  return (
    <>
      {hasWindow && cookies.jwt? postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      ):(
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username", { required: true })} /> <br/>
        <input {...register("userpw", { required: true })} /><br/>
        {(errors.username || errors.uesrpw) && <span>This field is required</span>}<br/>
        <input type="submit" />
      </form>
      )
    }
    </>
  );
}

export default Home


