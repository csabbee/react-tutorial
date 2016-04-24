class CommentBox extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        };

        this.declareMethods();
    }

    declareMethods() {
        this.handleSuccess = (data) => {
            this.setState({ data: data });
        };

        this.handleError = (xhr, status, err) => {
            console.error(this.props.url, status, err.toString());
        };

        this.loadCommentsFromServer = () => {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                cache: false,
                success: this.handleSuccess,
                error: this.handleError
            });
        };

        this.handleCommentSubmit = (comment) => {
            var comments = this.state.data;
            comment.id = Date.now();
            var newComments = comments.concat([comment]);
            this.setState({ data: newComments });
            
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                type: 'POST',
                data: comment,
                success: this.handleSuccess,
                error: () => {
                    this.handleError.apply(xhr, status, err);
                    this.setState({ data: comments });
                }
            });
        };
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval)
    }

    render() {
        return (
            <div className="commentBox">
                Hello world! I am a comment box.
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        )
    }
}

class CommentList extends React.Component {
    render() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>

            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
}

class CommentForm extends React.Component {
    constructor() {
        super();
        this.state = {
            author: '',
            text: ''
        };

        this.declareMethods();
    }

    declareMethods() {
        this.handleAuthorChange = (e) => {
            this.setState({ author: e.target.value });
        }

        this.handleTextChange = (e) => {
            this.setState({ text: e.target.value });
        }

        this.handleSubmit = (e) => {
            e.preventDefault();
            var {author, text} = this.state;
            if (!author || !text) {
                return;
            }
            this.props.onCommentSubmit({ author: author.trim(), text: text.trim() });
            this.setState({ author: '', text: '' });
        }
    }

    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input 
                    type="text"
                    placeholder="Your name"
                    value={this.state.author}
                    onChange={this.handleAuthorChange} />
                <input
                    type="text"
                    placeholder="Say Something"
                    value={this.state.text}
                    onChange={this.handleTextChange} />
                <input type="submit" value="Post"/>
            </form>
        );
    }
}

class Comment extends React.Component {
    rawMarkup() {
        var rawMarkup = marked(this.props.children.toString(), { sanitize: true });
        return { __html: rawMarkup };
    }

    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
}

ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={5000}/>,
    document.getElementById('content')
);