package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.CommentplyDao;
import web.model.dao.ReplyDao;

@Service
public class ReplyService {
    @Autowired
    private ReplyDao replyDao;
    @Autowired private UserService userService;
}
