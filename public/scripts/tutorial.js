class CommentBox extends React.Component {
    render() {
        return (
            <div className="commentBox">
                Hello world! I am a comment box.
                <CommentList/>
                <CommentForm/>
            </div>
        )
    }
}

class CommentList extends React.Component {
    render() {
        return (
            <div className="commentList">
                <Comment author="Peter Hunt">This is one comment</Comment>
                <Comment author="Jordan Walke">This is *another* comment</Comment>
            </div>
        );
    }
}

class CommentForm extends React.Component {
    render() {
        return (
            <div className="commentForm">
                Hello world! I am a comment form.
            </div>
        );
    }
}

class Comment extends React.Component {
    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                {this.props.children}
            </div>
        );
    }
}

ReactDOM.render(
    <CommentBox/>,
    document.getElementById('content')
);