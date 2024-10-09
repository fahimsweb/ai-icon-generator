interface Icons {
  icons: Array<Icon>;
}
interface Icon {
  url: string;
}

const IconList = ({ icons }: Icons) => {
  return (
    <div>
      <h2>Generated Icons:</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {icons.map((icon, index) => (
          <div key={index} style={{ margin: "10px" }}>
            <img
              src={icon.url}
              alt={`Generated icon ${index}`}
              style={{ width: "100px", height: "100px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconList;
