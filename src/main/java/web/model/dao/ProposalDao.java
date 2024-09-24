package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.ProposalDto;

import java.util.List;

@Mapper
public interface ProposalDao {
    List<ProposalDto> get( );
}
