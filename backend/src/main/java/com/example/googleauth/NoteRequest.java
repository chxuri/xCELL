
//class w only title and content to prevent users from accessing other people's notes
public class NoteRequest
{
    private String title;
    private String content;

    public NoteRequest()
    {

    }

    public String getTitle()
    {
        return title;
    }

    public String getContent()
    {
        return content;
    }

    public void setTitle(String t)
    {
        title = t;
    }

    public void setContent(String c)
    {
        content = c;
    }
}