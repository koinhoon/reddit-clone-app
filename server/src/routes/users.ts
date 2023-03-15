import { Request, Response, Router } from "express";
import Post from "../entities/Post";
import User from "../entities/User";
import Comment from "../entities/Comment";
import userMiddleware from "../middlewares/user";

const router = Router();

const getUserData = async (req: Request, res: Response) => {
    try {
        // 유저 정보 가져오기
        const user = await User.findOneOrFail({
            where : { username : req.params.username },
            select : ["username", "createdAt"],
        })

        // 유저가 쓴 포스트 정보 가져오기
        const posts = await Post.find({
            where : {username : user.username },
            relations : ["comments", "votes", "sub"]
        })

        // 유저가 쓴 댓글 가져오기
        const comments = await Comment.find({
            where : { username : user.username },
            relations:["post"]
        })

        if(res.locals.user) {
            const { user } = res.locals;
            posts.forEach((p) => p.setUserVote(user));
            comments.forEach((c) => c.setUserVote(user));
        }

        let userData: any[] = [];

        

        posts.forEach((p) => { 
            console.log(p);
            console.log(p.toJSON());
            userData.push({ type: "Post", ...p.toJSON() });
        });
        comments.forEach((c) => userData.push({ type: "Comment", ...c.toJSON() }));

        userData.sort((a,b) => {
            if(b.createdAt > a.createdAt) return 1;
            if(b.createdAt < a.createdAt) return -1;
            return 0;
        })
        return res.json({user, userData});
        
    } catch(error) {
        console.log(error);
        return res.status(500).json({ error : "문제가 발생했씁니다."})
    }

}

router.get("/:username", userMiddleware, getUserData)

export default router;