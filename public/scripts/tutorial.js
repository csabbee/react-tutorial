class CommentBox extends React.Component {
    render() {
        return (
            <div class="commentBox">
                Hello world! I am a comment box.
            </div>
        )
    }
};

ReactDOM.render(
    <CommentBox/>,
    document.getElementById('content')
);