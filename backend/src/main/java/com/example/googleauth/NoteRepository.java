import java.util.List;

//so spring can generate the repository
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long>
{
    //method provided by jpa!!
    List<Note> findByUserId(String userId);
}