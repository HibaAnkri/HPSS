package hsid.demo.HSID_Backend.Service.Impl;

import hsid.demo.HSID_Backend.Dtos.ElementvaluesDto;
import hsid.demo.HSID_Backend.Entities.Element;
import hsid.demo.HSID_Backend.Entities.Elementvalues;
import hsid.demo.HSID_Backend.Mappers.ElementvaluesMapper;
import hsid.demo.HSID_Backend.Repository.ElementvaluesRepository;
import hsid.demo.HSID_Backend.Service.ElementsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ElementsServiceImpl implements ElementsService {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private ElementvaluesRepository elementvaluesRepository;

    @Override
    public List<Element> getSpecificAttribute(String attribute) {
        String sql = "SELECT elementnumber, attribute, description, " + attribute + " FROM elements WHERE " + attribute + " IS NOT NULL ORDER BY elementnumber ASC";
        return jdbcTemplate.query(sql, rs -> {
            List<Element> elements = new ArrayList<>();
            while (rs.next()) {
                Element element = new Element();
                element.setElementNumber(rs.getInt("elementnumber"));
                element.setAttribute(rs.getString("attribute"));
                element.setDescription(rs.getString("description"));
                element.setSpecificAttributeValue(rs.getString(attribute));
                elements.add(element);
            }
            return elements;
        });
    }

}