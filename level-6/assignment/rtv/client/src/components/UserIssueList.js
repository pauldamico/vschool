import React, {useState, useContext} from "react"
import Issue from "./Issue.js"
import { IssueContext } from "../context/IssueProvider"
import { UserContext } from "../context/UserProvider.js"
export default function UserIssueList (){
    const {userIssues} = useContext(IssueContext)
    const {token} = useContext(UserContext)
    const sortByLikes = userIssues.map(issue=>issue).sort((a,b)=>b.likes.length - a.likes.length)
    return (
        <div>
   {token && sortByLikes.map(issue=><Issue key={issue._id} {...issue} />)}

        </div>
    )
    }