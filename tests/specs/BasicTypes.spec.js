import byContract, { Exception } from "../../dist/dev";

describe( "Basic Type Validation", () => {

  describe( "{string}", () => {
    it( "doesn't throw when byContract( \"string\", \"String\" )", () => {
      var fn = () => { byContract( "string", "String" ); };
      expect( fn ).not.toThrow();
    });
    it( "doesn't throw when byContract( \"string\", \"string\" )", () => {
      var fn = () => { byContract( "string", "string" ); };
      expect( fn ).not.toThrow();
    });
    it( "doesn't throw when byContract( [ \"string\" ], [ \"string\" ] )", () => {
      var fn = () => { byContract( [ "string" ], [ "string" ] ); };
      expect( fn ).not.toThrow();
    });


    const schemas = [
      { v: 1, t: "number" },
      { v: [], t: "array" },
      { v: {}, t: "object" },
      { v: /preg/, t: "regexp" },
      { v: undefined, t: "undefined" },
      { v: true, t: "boolean" },
      { v: null, t: "null" },
      { v: () => {}, t: "function" },
      { v: NaN, t: "nan" }
    ];

    schemas.forEach(({ v, t }) => {
      it( `throws explanatory message when "${ t }" received but "string" expected`, () => {
        var fn = () => byContract( v, "string" );
        expect( fn ).toThrowError( `Expected string but got ${ t }` );
      });
    });

  });

  describe( "{number}", () => {
    it( "doesn't throw when correct", () => {
      var fn = () => { byContract( 1, "number" ); };
      expect( fn ).not.toThrow();
    });
    it( "throws when when incorrect", () => {
      [ "string", [], {}, /preg/, undefined, true, null, () => {}, NaN ].forEach(( val ) => {
        var fn = () => { byContract( val, "number" ); };
        expect( fn ).toThrowError( /Expected number but got/ );
      });
    });
  });

  describe( "{array}", () => {
    it( "doesn't throw when correct", () => {
      var fn = () => { byContract( [], "array" ); };
      expect( fn ).not.toThrow();
    });
    it( "throws when when incorrect", () => {
      [ "string", 1, {}, /preg/, undefined, true, null, () => {}, NaN ].forEach(( val ) => {
        var fn = () => { byContract( val, "array" ); };
        expect( fn ).toThrowError( /Expected array but got/ );
      });
    });
  });
  describe( "{undefined}", () => {
    it( "doesn't throw when correct", () => {
      var fn = () => { byContract( undefined, "undefined" ); };
      expect( fn ).not.toThrow();
    });
    it( "throws when when incorrect", () => {
      [ "string", 1, {}, /preg/, [], true, null, () => {}, NaN ].forEach(( val ) => {
        var fn = () => { byContract( val, "undefined" ); };
        expect( fn ).toThrowError( /Expected undefined but got/ );
      });
    });
  });
  describe( "{boolean}", () => {
    it( "doesn't throw when correct", () => {
      var fn = () => { byContract( false, "boolean" ); };
      expect( fn ).not.toThrow();
    });
    it( "throws when when incorrect", () => {
      [ "string", [], {}, /preg/, undefined, 1, null, () => {}, NaN ].forEach(( val ) => {
        var fn = () => { byContract( val, "boolean" ); };
        expect( fn ).toThrowError( /Expected boolean but got/ );
      });
    });
  });
  describe( "{function}", () => {
    it( "doesn't throw when correct", () => {
      var fn = () => { byContract( () => {}, "function" ); };
      expect( fn ).not.toThrow();
    });
    it( "throws when when incorrect", () => {
      [ "string", [], {}, /preg/, undefined, true, null, 1, NaN ].forEach(( val ) => {
        var fn = () => { byContract( val, "function" ); };
        expect( fn ).toThrowError( /Expected function but got/ );
      });
    });
  });
  describe( "{nan}", () => {
    it( "doesn't throw when correct", () => {
      var fn = () => { byContract( NaN, "nan" ); };
      expect( fn ).not.toThrow();
    });
    it( "throws when when incorrect", () => {
      [ "string", [], {}, /preg/, undefined, true, null, () => {}, 1 ].forEach(( val ) => {
        var fn = () => { byContract( val, "nan" ); };
        expect( fn ).toThrowError( /Expected nan but got/ );
      });
    });
  });
  describe( "{null}", () => {
    it( "doesn't throw when correct", () => {
      var fn = () => { byContract( null, "null" ); };
      expect( fn ).not.toThrow();
    });
    it( "throws when when incorrect", () => {
      [ "string", [], {}, /preg/, undefined, true, 1, () => {}, NaN ].forEach(( val ) => {
        var fn = () => { byContract( val, "null" ); };
        expect( fn ).toThrowError( /Expected null but got/ );
      });
    });
  });
  describe( "{object}", () => {
    it( "doesn't throw when correct", () => {
      var fn = () => { byContract( {}, "object" ); };
      expect( fn ).not.toThrow();
    });
    it( "throws when when incorrect", () => {
      [ "string", 1 ].forEach(( val ) => {
        var fn = () => { byContract( val, "object" ); };
        expect( fn ).toThrowError( /Expected object but got/ );
      });
    });
  });
  describe( "{regexp}", () => {
    it( "doesn't throw when correct", () => {
      var fn = () => { byContract( /regexp/, "regexp" ); };
      expect( fn ).not.toThrow();
    });
    it( "throws when when incorrect", () => {
      [ "string", [], {}, 1, undefined, true, null, () => {}, NaN ].forEach(( val ) => {
        var fn = () => { byContract( val, "regexp" ); };
        expect( fn ).toThrowError( /Expected regexp but got/ );
      });
    });
  });

});
