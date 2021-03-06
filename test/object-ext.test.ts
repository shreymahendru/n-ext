import * as assert from "assert";
import "../src/object-ext";

suite("ObjectExt", () =>
{
    // suite("mapToObject", () =>
    // {
    //     let original: any;
    //     let mapped: any;
        
    //     setup(() =>
    //     {
    //         original = {
    //             name: "Keanu",
    //             address: {
    //                 street: "15 Benton rd",
    //                 province: "ON"
    //             }
    //         };

    //         mapped = original.mapToObject(() => ({}));
    //     });
        
    //     teardown(() =>
    //     {
    //         original = null;
    //         mapped = null;
    //     });
        
    //     test("original should not be the same object as mapped", () =>
    //     {
    //         assert.notStrictEqual(mapped, original); 
    //     });
        
    //     test("original primitive properties and mapped primitive properties should have the same value", () =>
    //     {
    //         assert.strictEqual(mapped.name, original.name);
    //     });
        
    //     test("original object properties and mapped object properties should not be the same reference", () => 
    //     {
    //         assert.notStrictEqual(mapped.address, original.address);
    //     });
        
    //     test("primitive properties on original and mapped object properties must have the same value", () =>
    //     {
    //         assert.strictEqual(mapped.address.street, original.address.street);
    //         assert.strictEqual(mapped.address.province, original.address.province);
    //     });
    // });
    
    // suite("merge", () =>
    // {
    //     test("should successfully merge", () =>
    //     {
    //         let obj: Object = { a: 1, b: "2" };
    //         let val = { b: 2, c: false };
            
    //         obj.merge(val);
            
    //         assert.deepStrictEqual(obj, { a: 1, b: 2, c: false });
    //     });
    // });
    
    suite("getTypeName", () =>
    {
        let val: Object = null;
        let typeName: string = null;
        
        teardown(() =>
        {
            val = null;
            typeName = null;
        });
        
        test("should return 'number' for number instance", () =>
        {
            val = 1;
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "number");
        });
        
        test("should return 'boolean' for bool instance", () =>
        {
            val = true;
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "boolean");
        });
        
        test("should return 'string' for string instance", () =>
        {
            val = "value";
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "string");
        });
        
        test("should return 'Array' for array instance", () =>
        {
            val = [];
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Array");
        });
        
        test("should return 'Date' for Date instance", () =>
        {
            val = new Date();
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Date");
        });
        
        test("should return 'Object' for object literal instance", () =>
        {
            val = {}; 
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Object");
        });
        
        test("should return name of the class for custom class instance", () =>
        {
            class Foo { }
            val = new Foo();
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Foo");
        });
        
        test("should return the name of the instantiated derived class for custom class instance", () =>
        {
            class Foo { }
            class Bar extends Foo { }
            val = new Bar();
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Bar");
        });
        
        // test("should return empty string for an arrow function", () =>
        // {
        //     val = () => "foo";
        //     typeName = val.getTypeName();
        //     assert.strictEqual(typeName, "");
        // });
        
        test("should return empty string for an anonymous function", () =>
        {
            val = function () { };
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "");
        });
        
        test("should return name of the function for a named function", () =>
        {
            val = function foo() { };
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "foo");
        });
        
        test("should return class name for a class object", () =>
        {
            class Foo { }
            class Bar extends Foo { }
            val = Bar;
            typeName = val.getTypeName();
            assert.strictEqual(typeName, "Bar");
        });
    });
    
    suite("getValue", () =>
    {
        let targetCountry: Object = null;
        let targetAddress: Object = null;
        let target: Object = null;
        
        setup(() =>
        {
            targetCountry =
                {
                    name: "Canada",
                    code: "CA"
                };
            
            targetAddress =
                {
                    street: "711 Kennedy rd",
                    city: "Toronto",
                    country: targetCountry
                };
            
            target =
                {
                    firstName: "John",
                    lastName: "Smith",
                    address: targetAddress
                };
        });
         
        teardown(() =>
        {
            targetCountry = null;
            targetAddress = null;
            target = null;
        });
        
        test("should return undefined if the key is null", () =>
        {
            let key: string = null;
            let value = target.getValue(key);
            assert.strictEqual(value, undefined);
        });
        
        test("should return undefined if the key is an empty string", () =>
        {
            let key = "";
            let value = target.getValue(key);
            assert.strictEqual(value, undefined);
        });
        
        test("should return undefined if the key is a string with just whitespace", () =>
        {
            let key = "  ";
            let value = target.getValue(key);
            assert.strictEqual(value, undefined);
        });
        
        test("should return null if the key does not exist on the target object", () =>
        {
            let key = "something";
            let value = target.getValue(key);
            assert.strictEqual(value, null);
        });
        
        test("should return value if the key exists on the target object", () =>
        {
            let key = "firstName";
            let value = target.getValue(key);
            assert.strictEqual(value, "John");
        });
        
        test("should return value if the multi level key exists on the target object", () =>
        {
            let key = "address.country";
            let value = target.getValue(key);
            assert.strictEqual(value, targetCountry);
        });
        
        test("should return value if the multi level (3 levels) key exists on the target object", () =>
        {
            let key = "address.country.code";
            let value = target.getValue(key);
            assert.strictEqual(value, "CA");
        });
        
        test("should return null if the top level of a multi level key does not exist on the target object", () =>
        {
            let key = "something.country";
            let value = target.getValue(key);
            assert.strictEqual(value, null);
        });
        
        test("should return null if the middle level of a multi level key does not exist on the target object", () =>
        {
            let key = "address.something.code";
            let value = target.getValue(key);
            assert.strictEqual(value, null);
        });
        
        test("should return null if the bottom level of a multi level key does not exist on the target object", () =>
        {
            let key = "address.country.something";
            let value = target.getValue(key);
            assert.strictEqual(value, null);
        });
    });
    
    suite("setValue", () =>
    {
        let targetCountry: Object = null;
        let targetAddress: Object = null;
        let target: {[index: string]: any} = null;
        let targetString: string = null;
        
        let getCurrentTargetString = () => JSON.stringify(target);

        setup(() =>
        {
            targetCountry =
                {
                    name: "Canada",
                    code: "CA"
                };

            targetAddress =
                {
                    street: "711 Kennedy rd",
                    city: "Toronto",
                    country: targetCountry
                };

            target =
                {
                    firstName: "John",
                    lastName: "Smith",
                    address: targetAddress
                };
            
            targetString = JSON.stringify(target);
        });


        teardown(() =>
        {
            targetCountry = null;
            targetAddress = null;
            target = null;
            targetString = null;
        });
        
        test("should not do anything if the key is null", () =>
        {
            let key = null;
            target.setValue(key, "some val");
            assert.strictEqual(getCurrentTargetString(), targetString);
        });
        
        test("should not do anything if the key is an empty string", () =>
        {
            let key = "";
            target.setValue(key, "some val");
            assert.strictEqual(getCurrentTargetString(), targetString);
        });
        
        test("should not do anything if the key is a string with just whitespace", () =>
        {
            let key = "  ";
            target.setValue(key, "some val");
            assert.strictEqual(getCurrentTargetString(), targetString);
        });
        
        test("should set value given a key that is a single level key", () =>
        {
            let key = "firstName";
            let value = "Kevin";
            target.setValue(key, value);
            assert.strictEqual(target[key], value);
        });
        
        test("should set value given a multi level key", () =>
        {
            let key = "address.country.code";
            let value = "us";
            target.setValue(key, value);
            assert.strictEqual((<any>target).address.country.code, value);
        });
        
        test("should set value given a single level key even if key does not already exist on the object", () =>
        {
            let key = "nickName";
            let value = "Johnny";
            target.setValue(key, value);
            assert.strictEqual((<any>target).nickName, value);
        });
        
        test("should set value given a multi level key even if the bottom level key does not already exist on the object", () =>
        {
            let key = "address.country.language";
            let value = "en-ca";
            target.setValue(key, value);
            assert.strictEqual((<any>target).address.country.language, value);
        });
        
        test("should set value given a multi level key even if the middle level key does not already exist on the object", () =>
        {
            let key = "address.province.name";
            let value = "Ontario";
            target.setValue(key, value);
            assert.strictEqual((<any>target).address.province.name, value);
        });
        
        test("should set value given a multi level key even of none of the key levels already exist on the object", () =>
        {
            let key = "shippingAddress.province.name";
            let value = "Quebec";
            target.setValue(key, value);
            assert.strictEqual((<any>target).shippingAddress.province.name, value);
        });
    });

    suite("serialize deserialize", () =>
    {
        class Address
        {
            private readonly _line1: string;
            private readonly _line2: string;


            public get line1(): string { return this._line1; }
            public get line2(): string { return this._line2; }


            public constructor(line1: string, line2: string)
            {
                this._line1 = line1;
                this._line2 = line2;
            }
        }

        class Customer
        {
            private readonly _firstName: string;
            private readonly _lastName: string;
            private readonly _address: Address;


            public get firstName(): string { return this._firstName; }
            public get lastName(): string { return this._lastName; }
            public get address(): Address { return this._address; }


            public constructor(firstName: string, lastName: string, address: Address)
            {
                this._firstName = firstName;
                this._lastName = lastName;
                this._address = address;
            }
        }

        test("serialize", () =>
        {
            const original: Object = new Customer("Nivin", "Joseph", new Address("26 Kennedy rd", "Apt 23"));

            const serialized = original.serializeObject("firstName", "lastName as lname", "address.line1 as add.l1", "address.line2 as apt");
            // console.log("serialized", serialized);

            assert.deepStrictEqual(serialized, {
                firstName: "Nivin",
                lname: "Joseph",
                add: {
                    l1: "26 Kennedy rd"
                },
                apt: "Apt 23"
            });
        });

        test("deserialize", () =>
        {
            const serialized: Object = {
                firstName: "Nivin",
                lname: "Joseph",
                add: {
                    l1: "26 Kennedy rd"
                },
                apt: "Apt 23"
            };

            const deserialized = serialized.deserializeObject(Customer, "firstName", "lname", serialized.deserializeObject(Address, "add.l1", "apt"));
            // console.log("deserialized", deserialized);

            assert.deepStrictEqual(deserialized, new Customer("Nivin", "Joseph", new Address("26 Kennedy rd", "Apt 23")));
        });
    });
});