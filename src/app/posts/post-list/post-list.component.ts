import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { PostsService } from '../posts.service'
import { Post } from '../post.model'

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',    
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
    // posts = [
    //     {title:'first post', content: 'first post content'},
    //     {title:'second post', content: 'second post content'},
    //     {title:'third post', content: 'third post content'},
    // ];
    posts: Post[] = [];
    isLoading = false;
    private postsSub: Subscription = new Subscription;

    constructor(public postsService: PostsService) {}

    ngOnInit() {
        this.isLoading = true;
        this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
            this.isLoading = false;
            this.posts = posts;
        });
    }

    onDelete(postId: string) {
        this.postsService.deletePost(postId);
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }
}