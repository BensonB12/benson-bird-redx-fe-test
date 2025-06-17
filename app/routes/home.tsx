import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [error, setError] = useState<any>(null);
  const [search, setSearch] = useState<any>("");
  const [count, setCount] = useState<any>(0);
  const [filteredData, setFilteredData] = useState<any>([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/users?client=true');
        const result = await response.json();
        
        if (response.ok) {
          setData(result.users);
          setCount(result.users.length);
          setFilteredData(result.users);
        } else {
          setError("Failed");
        }
      } catch (e) {
        setError("Error");
      }
      setLoading(false);
    })();
  }, []);

  const doFilter = (searchTerm: any) => {
    if (!searchTerm || searchTerm === "") {
      setFilteredData(data);
    } else {
      let results: any = [];
      for (let i = 0; i < data.length; i++) {
        const user = data[i];
        if (user.name && user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          results.push(user);
        } else if (user.email && user.email.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          results.push(user);
        }
      }
      setFilteredData(results);
    }
  };

  useEffect(() => {
    doFilter(search);
  });

  if (loading) {
    return (
      <div style={{padding: '20px'}}>
        <div style={{border: '3px solid red', padding: '15px', backgroundColor: 'yellow'}}>
          <div style={{fontSize: '25px', color: 'purple'}}>LOADING...</div>
          <div style={{fontSize: '12px'}}>please wait</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{padding: '20px'}}>
        <div style={{border: '5px solid black', padding: '25px', backgroundColor: 'red', color: 'white'}}>
          <div style={{fontSize: '35px'}}>💀</div>
          <div style={{fontSize: '20px'}}>SOMETHING WENT WRONG!!!</div>
          <div>{error}</div>
          <button 
            onClick={() => {
              setError(null);
              setLoading(true);
              window.location.reload();
            }} 
            style={{padding: '10px', marginTop: '10px', backgroundColor: 'orange', border: '2px solid black'}}
          >
            CLICK TO TRY AGAIN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{padding: '5px', fontFamily: 'Times New Roman', backgroundColor: '#f0f0f0'}}>
      <div style={{textAlign: 'center', marginBottom: '15px', border: '4px solid blue', padding: '10px', backgroundColor: 'lightgreen'}}>
        <div style={{fontSize: '28px', fontWeight: 'bold', color: 'darkblue', textShadow: '2px 2px 0px yellow'}}>
          REDX Frontend Test
        </div>
        <div style={{fontSize: '11px', color: 'red', fontStyle: 'italic'}}>
          React Router v7 + API + Search
        </div>
      </div>

      <div>
        <div style={{marginBottom: '10px',border: '2px dashed green',padding: '8px',backgroundColor: '#ffff99'}}>
          <div style={{marginBottom: '3px', fontWeight: 'bold', color: 'darkgreen'}}>SEARCH USERS HERE:</div>
          <div>
            <input
              type="text"
              placeholder="type to search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              style={{
                width: '280px',
                padding: '8px',
                border: '3px solid orange',
                backgroundColor: 'white',
                fontSize: '14px',
                marginRight: '5px'
              }}
            />
            {search && (
              <button 
                type="button" 
                onClick={() => {
                  setSearch("");
                }}
                style={{padding: '8px 12px', backgroundColor: 'pink', border: '2px solid red', fontSize: '12px'}}
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        <div style={{
          marginBottom: '8px',
          padding: '6px',
          backgroundColor: 'lightblue',
          border: search ? '3px solid purple' : '1px solid gray'
        }}>
          <div style={{fontWeight: 'bold', fontSize: '13px'}}>
            {search ? (
              <span style={{color: 'darkred'}}>
                FOUND: {filteredData.length} user{filteredData.length !== 1 ? "s" : ""} matching "{search}"
                {filteredData.length !== data.length && (
                  <span style={{color: 'blue'}}> (out of {data.length} total users)</span>
                )}
              </span>
            ) : (
              <span style={{color: 'darkgreen'}}>
                SHOWING: {data.length} total user{data.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <div style={{fontSize: '10px', color: 'gray', marginTop: '2px'}}>
            API • Client search
          </div>
        </div>

        <div style={{border: '4px solid black', backgroundColor: 'white'}}>
          <div style={{
            display: 'flex',
            backgroundColor: '#87CEEB',
            fontWeight: 'bold',
            borderBottom: '2px solid black',
            fontSize: '14px'
          }}>
            <div style={{width: '180px', padding: '12px', borderRight: '2px solid black', textAlign: 'center', backgroundColor: '#FFB6C1'}}>
              👤 NAME
            </div>
            <div style={{width: '220px', padding: '12px', borderRight: '2px solid black', textAlign: 'center', backgroundColor: '#98FB98'}}>
              📧 EMAIL
            </div>
            <div style={{width: '140px', padding: '12px', textAlign: 'center', backgroundColor: '#DDA0DD'}}>
              📅 CREATED
            </div>
          </div>

          {filteredData.map((user: any, index: any) => {
            const bgColor = index % 2 === 0 ? '#FFFFFF' : '#F0F0F0';
            const nameColor = user.name ? 'black' : 'red';
            
            return (
              <div 
                key={user.id + "_" + index}
                style={{
                  display: 'flex',
                  backgroundColor: bgColor,
                  borderBottom: '1px dotted gray',
                  fontSize: '12px'
                }}
              >
                <div style={{width: '180px', padding: '6px', borderRight: '1px solid gray'}}>
                  <span style={{fontWeight: 'bold', color: nameColor}}>
                    {user.name || "NO NAME FOUND"}
                  </span>
                </div>
                <div style={{width: '220px', padding: '6px', borderRight: '1px solid gray'}}>
                  <span style={{color: 'blue', textDecoration: 'underline'}}>
                    {user.email}
                  </span>
                </div>
                <div style={{width: '140px', padding: '6px'}}>
                  <span style={{fontSize: '10px', color: 'gray'}}>
                    {(() => {
                      try {
                        return new Date(user.createdAt).toLocaleDateString();
                      } catch (e) {
                        return "Invalid Date";
                      }
                    })()}
                  </span>
                </div>
              </div>
            );
          })}

          {filteredData.length === 0 && (
            <div style={{
              padding: '25px',
              textAlign: 'center',
              backgroundColor: '#FFB6C1',
              border: '3px solid red',
              fontSize: '16px'
            }}>
              <div style={{fontWeight: 'bold', marginBottom: '8px', color: 'darkred'}}>
                {search ? (
                  <span>
                    😞 NO USERS FOUND FOR "{search}"
                  </span>
                ) : (
                  <span>😞 NO USERS EXIST</span>
                )}
              </div>
              {search && (
                <button 
                  onClick={() => {
                    setSearch("");
                    doFilter("");
                  }}
                  style={{
                    padding: '8px 15px',
                    backgroundColor: 'yellow',
                    border: '2px solid black',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  CLEAR SEARCH TO SEE ALL USERS
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
