package hsid.demo.HSID_Backend.Entities;

public class Element {
    private int elementNumber;
    private String attribute;
    private String description;
    private String specificAttributeValue;

    // Getters and setters
    public int getElementNumber() {
        return elementNumber;
    }

    public void setElementNumber(int elementNumber) {
        this.elementNumber = elementNumber;
    }

    public String getAttribute() {
        return attribute;
    }

    public void setAttribute(String attribute) {
        this.attribute = attribute;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSpecificAttributeValue() {
        return specificAttributeValue;
    }


    public void setSpecificAttributeValue(String specificAttributeValue) {
        this.specificAttributeValue = specificAttributeValue;
    }

}